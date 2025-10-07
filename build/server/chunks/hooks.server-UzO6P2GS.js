import { T as TRANSCRIPT_DIR, i as initializeGlobalCache, s as shutdownGlobalCache } from './transcript-cache-CC28Y9w0.js';
import 'fs';
import 'path';
import 'chokidar';
import 'events';
import 'ajv';
import 'ajv-formats';
import './transcript-utils-BY7i01oF.js';
import './constants-C6XQO3qi.js';

let cacheInitialized = false;
async function initializeCache() {
  if (cacheInitialized) return;
  try {
    console.log(`🚀 [SERVER] Initializing transcript cache for directory: ${TRANSCRIPT_DIR}`);
    await initializeGlobalCache(TRANSCRIPT_DIR);
    cacheInitialized = true;
    console.log("✅ [SERVER] Transcript cache initialized successfully");
  } catch (error) {
    console.error("🚨 [SERVER] Failed to initialize transcript cache:", error);
  }
}
process.on("SIGTERM", async () => {
  console.log("🛑 [SERVER] Received SIGTERM, shutting down gracefully...");
  await shutdownGlobalCache();
  process.exit(0);
});
process.on("SIGINT", async () => {
  console.log("🛑 [SERVER] Received SIGINT, shutting down gracefully...");
  await shutdownGlobalCache();
  process.exit(0);
});
const handle = async ({ event, resolve }) => {
  if (!cacheInitialized) {
    await initializeCache();
  }
  if (event.url.pathname.startsWith("/api/")) {
    const cache = await import('./transcript-cache-CC28Y9w0.js').then((n) => n.t).then((m) => m.getTranscriptCache());
    event.locals.cacheStats = cache.getStats();
  }
  const response = await resolve(event);
  if (process.env.NODE_ENV === "development" && event.locals.cacheStats) {
    const stats = event.locals.cacheStats;
    response.headers.set("X-Cache-Metadata-Count", stats.metadataCount.toString());
    response.headers.set("X-Cache-Transcript-Count", stats.fullTranscriptCount.toString());
    response.headers.set(
      "X-Cache-Hit-Rate",
      stats.cacheHits + stats.cacheMisses > 0 ? (stats.cacheHits / (stats.cacheHits + stats.cacheMisses) * 100).toFixed(1) + "%" : "0%"
    );
  }
  return response;
};

export { handle };
//# sourceMappingURL=hooks.server-UzO6P2GS.js.map
