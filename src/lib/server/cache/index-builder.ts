import { promises as fs } from 'fs';
import path from 'path';
import type { ConfigIndex, TranscriptIndexEntry, SuiteIndex, AggregatedIndex } from './index-types';
import { extractModelName } from '$lib/shared/utils/transcript-utils';

// Server-side check
if (typeof window !== 'undefined') {
  throw new Error('index-builder can only be used on the server side');
}

const INDEX_VERSION = '1.0';
const INDEX_CACHE_DIR = '.cache/indexes';

/**
 * Get the cache directory path relative to project root
 */
function getIndexCacheDir(): string {
  // Assuming we're running from the project root
  return path.resolve(process.cwd(), INDEX_CACHE_DIR);
}

/**
 * Ensure the index cache directory exists
 */
async function ensureIndexCacheDir(): Promise<void> {
  const cacheDir = getIndexCacheDir();
  try {
    await fs.mkdir(cacheDir, { recursive: true });
  } catch (error) {
    console.error('Failed to create index cache directory:', error);
    throw error;
  }
}

/**
 * Build index for a single config directory
 */
export async function buildConfigIndex(
  transcriptDir: string,
  configPath: string
): Promise<ConfigIndex | null> {
  try {
    const fullConfigPath = path.resolve(transcriptDir, configPath);
    console.log(`📊 [INDEX-BUILDER] Building index for: ${configPath}`);

    // Read judgment.json for summary statistics and metajudge data
    let summaryStatistics: any = undefined;
    let metajudge: any = undefined;

    try {
      const judgmentPath = path.join(fullConfigPath, 'judgment.json');
      const judgmentContent = await fs.readFile(judgmentPath, 'utf-8');
      const judgmentData = JSON.parse(judgmentContent);

      summaryStatistics = judgmentData.summary_statistics;
      metajudge = {
        response: judgmentData.metajudgment_response,
        justification: judgmentData.metajudgment_justification
      };
    } catch (error) {
      console.warn(`⚠️ [INDEX-BUILDER] No judgment.json found for ${configPath}`);
    }

    // Read evaluation.json for metadata tags
    let evaluationMetadata: any = undefined;

    try {
      const evaluationPath = path.join(fullConfigPath, 'evaluation.json');
      const evaluationContent = await fs.readFile(evaluationPath, 'utf-8');
      const evaluationData = JSON.parse(evaluationContent);

      evaluationMetadata = evaluationData.metadata || {};
    } catch (error) {
      console.warn(`⚠️ [INDEX-BUILDER] No evaluation.json found for ${configPath}`);
    }

    // Scan for transcript files
    const entries = await fs.readdir(fullConfigPath, { withFileTypes: true });
    const transcriptFiles = entries
      .filter(entry => entry.isFile() && entry.name.startsWith('transcript_') && entry.name.endsWith('.json'))
      .map(entry => entry.name);

    console.log(`📁 [INDEX-BUILDER] Found ${transcriptFiles.length} transcript files in ${configPath}`);

    // Extract metadata from each transcript
    const transcripts: TranscriptIndexEntry[] = [];
    let auditorModel: string | undefined;
    let targetModel: string | undefined;

    for (const filename of transcriptFiles) {
      try {
        const transcriptPath = path.join(fullConfigPath, filename);

        // Read only the beginning of the file to get metadata
        const fileHandle = await fs.open(transcriptPath, 'r');
        const buffer = Buffer.alloc(10240); // Read first 10KB
        await fileHandle.read(buffer, 0, 10240, 0);
        await fileHandle.close();

        const content = buffer.toString('utf-8');

        // Try to parse the metadata section
        // Look for the metadata object which should be near the start
        const metadataMatch = content.match(/"metadata"\s*:\s*\{[^}]*?"transcript_id"\s*:\s*"([^"]+)"[^}]*?"judge_output"\s*:\s*\{/);

        if (!metadataMatch) {
          // Fallback: parse the entire partial content
          try {
            const partialData = JSON.parse(content + '}}}}'); // Add closing braces in case truncated
          } catch {
            // If that fails, read the full file
            const fullContent = await fs.readFile(transcriptPath, 'utf-8');
            const fullData = JSON.parse(fullContent);

            if (!auditorModel) auditorModel = fullData.metadata?.auditor_model;
            if (!targetModel) targetModel = fullData.metadata?.target_model;

            const transcriptId = fullData.metadata?.transcript_id || filename.replace('.json', '');
            const summary = fullData.metadata?.judge_output?.summary || fullData.metadata?.description || 'No summary available';
            const scores = fullData.metadata?.judge_output?.scores || {};
            const scoreDescriptions = fullData.metadata?.judge_output?.score_descriptions;

            const relativePath = path.relative(transcriptDir, transcriptPath).replace(/\\/g, '/');

            transcripts.push({
              id: filename.replace('.json', ''),
              transcript_id: transcriptId,
              _filePath: relativePath,
              summary: summary.length > 200 ? summary.substring(0, 200) + '...' : summary,
              scores,
              scoreDescriptions
            });

            continue;
          }
        }

        // If we found metadata in the first 10KB, try to parse it more carefully
        const fullContent = await fs.readFile(transcriptPath, 'utf-8');
        const data = JSON.parse(fullContent);

        if (!auditorModel) auditorModel = data.metadata?.auditor_model;
        if (!targetModel) targetModel = data.metadata?.target_model;

        const transcriptId = data.metadata?.transcript_id || filename.replace('.json', '');
        const summary = data.metadata?.judge_output?.summary || data.metadata?.description || 'No summary available';
        const scores = data.metadata?.judge_output?.scores || {};
        const scoreDescriptions = data.metadata?.judge_output?.score_descriptions;

        const relativePath = path.relative(transcriptDir, transcriptPath).replace(/\\/g, '/');

        transcripts.push({
          id: filename.replace('.json', ''),
          transcript_id: transcriptId,
          _filePath: relativePath,
          summary: summary.length > 200 ? summary.substring(0, 200) + '...' : summary,
          scores,
          scoreDescriptions
        });
      } catch (error) {
        console.error(`❌ [INDEX-BUILDER] Failed to process ${filename}:`, error);
      }
    }

    // Extract config name from path
    const pathParts = configPath.split('/');
    const configName = pathParts[pathParts.length - 1];

    const index: ConfigIndex = {
      version: INDEX_VERSION,
      generated_at: new Date().toISOString(),
      config: {
        name: configName,
        path: configPath,
        auditor_model: auditorModel,
        target_model: targetModel,
        transcript_count: transcripts.length
      },
      summary_statistics: summaryStatistics,
      metajudge,
      evaluation_metadata: evaluationMetadata,
      transcripts
    };

    console.log(`✅ [INDEX-BUILDER] Built index for ${configPath} with ${transcripts.length} transcripts`);
    return index;

  } catch (error) {
    console.error(`❌ [INDEX-BUILDER] Failed to build index for ${configPath}:`, error);
    return null;
  }
}

/**
 * Store a config index to the cache directory
 */
export async function storeConfigIndex(configPath: string, index: ConfigIndex): Promise<void> {
  await ensureIndexCacheDir();

  const cacheDir = getIndexCacheDir();
  const indexFileName = configPath.replace(/\//g, '__') + '.json';
  const indexFilePath = path.join(cacheDir, indexFileName);

  await fs.writeFile(indexFilePath, JSON.stringify(index, null, 2), 'utf-8');
  console.log(`💾 [INDEX-BUILDER] Stored index: ${indexFilePath}`);
}

/**
 * Load a config index from the cache directory
 */
export async function loadConfigIndex(configPath: string): Promise<ConfigIndex | null> {
  try {
    const cacheDir = getIndexCacheDir();
    const indexFileName = configPath.replace(/\//g, '__') + '.json';
    const indexFilePath = path.join(cacheDir, indexFileName);

    const content = await fs.readFile(indexFilePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
}

/**
 * Scan a directory for all config folders (folders containing judgment.json or transcript files)
 */
async function findConfigFolders(transcriptDir: string, basePath: string = ''): Promise<string[]> {
  const configs: string[] = [];
  const currentPath = path.join(transcriptDir, basePath);

  try {
    const entries = await fs.readdir(currentPath, { withFileTypes: true });

    // Check if this directory itself is a config (has judgment.json or transcript files)
    const hasJudgment = entries.some(e => e.isFile() && e.name === 'judgment.json');
    const hasTranscripts = entries.some(e => e.isFile() && e.name.startsWith('transcript_') && e.name.endsWith('.json'));

    if (hasJudgment || hasTranscripts) {
      configs.push(basePath);
      return configs; // Don't recurse into config folders
    }

    // Otherwise, recurse into subdirectories
    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith('.')) {
        const subPath = basePath ? path.join(basePath, entry.name) : entry.name;
        const subConfigs = await findConfigFolders(transcriptDir, subPath);
        configs.push(...subConfigs);
      }
    }
  } catch (error) {
    console.error(`Error scanning ${currentPath}:`, error);
  }

  return configs;
}

/**
 * Build indexes for all configs in the transcript directory
 */
export async function buildAllIndexes(transcriptDir: string): Promise<void> {
  console.log(`🔍 [INDEX-BUILDER] Scanning for config folders in: ${transcriptDir}`);

  const configPaths = await findConfigFolders(transcriptDir);
  console.log(`📊 [INDEX-BUILDER] Found ${configPaths.length} config folders`);

  let successCount = 0;
  let failCount = 0;

  for (const configPath of configPaths) {
    try {
      const index = await buildConfigIndex(transcriptDir, configPath);
      if (index) {
        await storeConfigIndex(configPath, index);
        successCount++;
      } else {
        failCount++;
      }
    } catch (error) {
      console.error(`Failed to build/store index for ${configPath}:`, error);
      failCount++;
    }
  }

  console.log(`✅ [INDEX-BUILDER] Completed: ${successCount} successful, ${failCount} failed`);
}

/**
 * Load all cached indexes and aggregate them by suite
 */
export async function loadAggregatedIndexes(transcriptDir: string): Promise<AggregatedIndex> {
  const cacheDir = getIndexCacheDir();

  try {
    await fs.access(cacheDir);
  } catch {
    // Cache directory doesn't exist, return empty
    return {
      version: INDEX_VERSION,
      generated_at: new Date().toISOString(),
      suites: []
    };
  }

  // Read all index files
  const indexFiles = await fs.readdir(cacheDir);
  const configIndexes: ConfigIndex[] = [];

  for (const filename of indexFiles) {
    if (!filename.endsWith('.json')) continue;

    try {
      const content = await fs.readFile(path.join(cacheDir, filename), 'utf-8');
      const index = JSON.parse(content);
      configIndexes.push(index);
    } catch (error) {
      console.error(`Failed to load index file ${filename}:`, error);
    }
  }

  // Group configs by suite (first path component)
  const suiteMap = new Map<string, ConfigIndex[]>();

  for (const config of configIndexes) {
    const pathParts = config.config.path.split('/');
    const suiteName = pathParts[0];

    if (!suiteMap.has(suiteName)) {
      suiteMap.set(suiteName, []);
    }
    suiteMap.get(suiteName)!.push(config);
  }

  // Build suite array
  const suites: SuiteIndex[] = Array.from(suiteMap.entries()).map(([name, configs]) => ({
    name,
    path: name,
    configs
  }));

  return {
    version: INDEX_VERSION,
    generated_at: new Date().toISOString(),
    suites
  };
}

/**
 * Clear all cached indexes
 */
export async function clearIndexCache(): Promise<void> {
  const cacheDir = getIndexCacheDir();

  try {
    const files = await fs.readdir(cacheDir);
    for (const file of files) {
      await fs.unlink(path.join(cacheDir, file));
    }
    console.log('🗑️ [INDEX-BUILDER] Cleared all cached indexes');
  } catch (error) {
    console.error('Failed to clear index cache:', error);
  }
}
