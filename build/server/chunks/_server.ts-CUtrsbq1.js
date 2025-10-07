import { error, json } from '@sveltejs/kit';
import path from 'path';
import { T as TRANSCRIPT_DIR, g as getTranscriptCache } from './transcript-cache-CC28Y9w0.js';
import 'fs';
import 'chokidar';
import 'events';
import 'ajv';
import 'ajv-formats';
import './transcript-utils-BY7i01oF.js';
import './constants-C6XQO3qi.js';

function validateFilePath(filePath) {
  if (!filePath || typeof filePath !== "string") {
    return false;
  }
  const normalized = path.normalize(filePath);
  if (normalized.includes("../") || normalized.startsWith("/")) {
    return false;
  }
  if (normalized.includes("\0")) {
    return false;
  }
  if (!normalized.endsWith(".json")) {
    return false;
  }
  const filename = path.basename(normalized);
  if (!filename.startsWith("transcript_")) {
    return false;
  }
  return true;
}
const GET = async ({ url }) => {
  try {
    const filePath = url.searchParams.get("filePath");
    const metadataOnly = url.searchParams.get("metadataOnly") === "true";
    if (!filePath) {
      throw error(400, {
        message: "Missing required parameter: filePath"
      });
    }
    const resolvedPath = path.resolve(TRANSCRIPT_DIR, filePath);
    if (!validateFilePath(filePath)) {
      throw error(400, {
        message: `Invalid or unsafe file path: ${filePath}`
      });
    }
    const cache = getTranscriptCache();
    if (metadataOnly) {
      const metadata = await cache.getMetadata(resolvedPath);
      if (metadata === null) {
        throw error(404, {
          message: `Transcript not found: ${filePath}`
        });
      }
      return json({
        success: true,
        data: metadata
      }, {
        headers: {
          "Cache-Control": "public, max-age=300"
          // 5 minutes browser cache for metadata
        }
      });
    } else {
      const transcript = await cache.getFullTranscript(resolvedPath);
      if (transcript === null) {
        throw error(404, {
          message: `Transcript not found: ${filePath}`
        });
      }
      return json({
        success: true,
        data: transcript
      }, {
        headers: {
          "Cache-Control": "public, max-age=60"
          // 1 minute browser cache for full transcripts
        }
      });
    }
  } catch (err) {
    if (err.status) {
      throw err;
    }
    if (err?.code === "TRANSCRIPT_VALIDATION_FAILED" && err.validation) {
      const { errors: validationErrors } = err.validation;
      const details = validationErrors?.map?.((e, i) => {
        const path2 = e.path || "root";
        return `${i + 1}. ${path2}: ${e.message}`;
      })?.join("\n");
      console.error("Transcript validation error:", details);
      throw error(422, {
        message: "Transcript schema validation failed",
        details
      });
    }
    console.error("Transcript API error:", err);
    throw error(500, {
      message: "Internal server error while loading transcript"
    });
  }
};

export { GET };
//# sourceMappingURL=_server.ts-CUtrsbq1.js.map
