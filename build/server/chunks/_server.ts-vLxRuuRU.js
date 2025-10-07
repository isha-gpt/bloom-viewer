import { json, error } from '@sveltejs/kit';
import { promises } from 'fs';
import path from 'path';
import { T as TRANSCRIPT_DIR, g as getTranscriptCache } from './transcript-cache-CC28Y9w0.js';
import { D as DEFAULT_CONCURRENCY } from './constants-C6XQO3qi.js';
import { e as extractModelName } from './transcript-utils-BY7i01oF.js';
import 'chokidar';
import 'events';
import 'ajv';
import 'ajv-formats';

if (typeof window !== "undefined") {
  throw new Error("file-scanner can only be used on the server side");
}
async function scanDirectoryForTranscripts(dirPath, basePath = dirPath) {
  const files = [];
  const directories = [];
  const errors = [];
  try {
    const entries = await promises.readdir(dirPath, { withFileTypes: true });
    const transcriptFiles = entries.filter((entry) => entry.isFile() && entry.name.endsWith(".json")).map((entry) => {
      const fullPath = path.join(dirPath, entry.name);
      return path.relative(basePath, fullPath);
    });
    const subdirs = entries.filter((entry) => entry.isDirectory());
    files.push(...transcriptFiles);
    for (const subdir of subdirs) {
      const subdirPath = path.join(dirPath, subdir.name);
      const relativePath = path.relative(basePath, subdirPath);
      try {
        const subdirResult = await scanDirectoryForTranscripts(subdirPath, basePath);
        files.push(...subdirResult.files);
        directories.push(...subdirResult.directories);
        errors.push(...subdirResult.errors);
        const directoryInfo = {
          path: subdirPath,
          relativePath,
          isEmpty: subdirResult.files.length === 0 && subdirResult.directories.length === 0,
          hasTranscripts: subdirResult.files.length > 0,
          transcriptCount: subdirResult.files.length,
          subdirectoryCount: subdirResult.directories.length
        };
        directories.push(directoryInfo);
      } catch (error2) {
        const loadingError = {
          type: "permission_denied",
          message: `Failed to scan directory: ${subdirPath}`,
          file: subdirPath,
          details: error2 instanceof Error ? error2.message : String(error2)
        };
        errors.push(loadingError);
      }
    }
  } catch (error2) {
    const loadingError = {
      type: "permission_denied",
      message: `Failed to scan directory: ${dirPath}`,
      file: dirPath,
      details: error2 instanceof Error ? error2.message : String(error2)
    };
    errors.push(loadingError);
  }
  return { files, directories, errors };
}
async function checkPathAccess(dirPath) {
  try {
    await promises.access(dirPath);
    return true;
  } catch {
    return false;
  }
}
if (typeof window !== "undefined") {
  throw new Error("cached-bulk-loader can only be used on the server side");
}
async function loadCachedTranscriptsMetadataOnly(outputDir = "./transcripts", includeErrors = true) {
  console.log(`📂 [CACHED-LOADER] Starting cached metadata loading from: ${outputDir}`);
  const directoryExists = await checkPathAccess(outputDir);
  if (!directoryExists) {
    const error2 = {
      type: "file_not_found",
      message: `Directory not found: ${outputDir}`,
      file: outputDir
    };
    return {
      transcripts: [],
      errors: [error2],
      directories: [],
      stats: {
        totalFiles: 0,
        successfulFiles: 0,
        failedFiles: 1,
        validationErrors: 0,
        parseErrors: 0,
        totalDirectories: 0,
        emptyDirectories: 0
      }
    };
  }
  console.log("🔍 [CACHED-LOADER] Scanning directory structure...");
  const scanResult = await scanDirectoryForTranscripts(outputDir);
  console.log(`📁 [CACHED-LOADER] Found ${scanResult.files.length} files and ${scanResult.directories.length} directories`);
  const cache = getTranscriptCache();
  console.log("⚙️ [CACHED-LOADER] Loading metadata through cache...");
  const transcripts = [];
  const errors = [...scanResult.errors];
  const concurrency = DEFAULT_CONCURRENCY;
  const chunks = chunkArray(scanResult.files, concurrency);
  for (const chunk of chunks) {
    const results = await Promise.allSettled(
      chunk.map(async (relativePath) => {
        try {
          const absolutePath = path.resolve(outputDir, relativePath);
          const metadata = await cache.getMetadata(absolutePath);
          if (metadata) {
            const pathParts = relativePath.split("/");
            const behaviorDir = pathParts.length > 1 ? pathParts[pathParts.length - 2] : "";
            const fileName = pathParts[pathParts.length - 1];
            const transcriptNumber = fileName.endsWith(".json") ? fileName.slice(0, -5) : fileName;
            const summary = metadata.judge_output?.summary || metadata.description || "No summary available";
            const transcript = {
              id: metadata.transcript_id || transcriptNumber,
              model: extractModelName(metadata.target_model || ""),
              split: behaviorDir,
              concerningScore: metadata.judge_output?.scores?.concerning || 0,
              summary: summary.length > 200 ? summary.substring(0, 200) + "..." : summary,
              // Truncate long summaries
              scores: metadata.judge_output?.scores || {},
              scoreDescriptions: metadata.judge_output?.score_descriptions,
              judgeSummary: "",
              // Remove heavy field - not needed for homepage
              justification: "",
              // Remove heavy field - not needed for homepage
              tags: metadata.tags || [],
              systemPrompt: void 0,
              // Cannot extract system prompt from metadata-only (no events)
              transcript: void 0,
              // Remove heavy field - not needed for homepage
              _filePath: relativePath
              // Store relative path
            };
            return transcript;
          }
          return null;
        } catch (error2) {
          throw { filePath: relativePath, error: error2 };
        }
      })
    );
    for (const result of results) {
      if (result.status === "fulfilled" && result.value) {
        transcripts.push(result.value);
      } else if (result.status === "rejected") {
        const rejection = result.reason;
        errors.push({
          type: "unknown_error",
          message: `Failed to load metadata: ${rejection.filePath}`,
          file: rejection.filePath,
          details: rejection.error instanceof Error ? rejection.error.message : String(rejection.error)
        });
      }
    }
  }
  console.log(`✅ [CACHED-LOADER] Successfully loaded ${transcripts.length} transcript metadata`);
  console.log(`❌ [CACHED-LOADER] Failed to load ${errors.length - scanResult.errors.length} files`);
  const stats = {
    totalFiles: scanResult.files.length,
    successfulFiles: transcripts.length,
    failedFiles: errors.length - scanResult.errors.length,
    validationErrors: errors.filter((e) => e.type === "validation_error").length,
    parseErrors: errors.filter((e) => e.type === "parse_error").length,
    totalDirectories: scanResult.directories.length,
    emptyDirectories: scanResult.directories.filter((d) => d.isEmpty).length
  };
  console.log("📈 [CACHED-LOADER] Final statistics:", stats);
  return {
    transcripts,
    errors: includeErrors ? errors : [],
    directories: scanResult.directories,
    stats
  };
}
function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}
const GET = async ({ url }) => {
  try {
    const subdirectoryPath = url.searchParams.get("rootDir");
    const rootDir = subdirectoryPath ? path.resolve(TRANSCRIPT_DIR, subdirectoryPath) : TRANSCRIPT_DIR;
    const result = await loadCachedTranscriptsMetadataOnly(rootDir);
    return json(result.transcripts);
  } catch (err) {
    console.error("Metadata list API error:", err);
    throw error(500, { message: "Failed to load transcript metadata list" });
  }
};

export { GET };
//# sourceMappingURL=_server.ts-vLxRuuRU.js.map
