import { K as getContext } from './index-CeukPVPf.js';
import './client-DCZcF6HN.js';

const getStores = () => {
  const stores$1 = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores$1.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores$1.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function toPosixPath(p) {
  return p.replace(/\\/g, "/");
}
function buildTranscriptUrl(relativePath) {
  const safe = toPosixPath(relativePath || "");
  const segments = safe.split("/").filter(Boolean).map(encodeURIComponent);
  return `/transcript/${segments.join("/")}`;
}
function normalizeClientFilePath(p) {
  if (!p) return null;
  return toPosixPath(p);
}
function parseUrlPath(pathSegments) {
  if (!pathSegments || pathSegments.length === 0) {
    throw new Error("Invalid path: empty path segments");
  }
  const decodedSegments = pathSegments.map((segment) => {
    try {
      return decodeURIComponent(segment);
    } catch (error) {
      throw new Error(`Invalid URL encoding in path segment: ${segment}`);
    }
  });
  const filePath = decodedSegments.join("/");
  if (!filePath || !filePath.endsWith(".json")) {
    throw new Error(`Invalid file path: ${filePath}`);
  }
  if (filePath.startsWith("/")) {
    throw new Error("Invalid file path: must be relative, not absolute");
  }
  if (filePath.includes("../")) {
    throw new Error("Invalid file path: directory traversal is not allowed");
  }
  const lastSlash = filePath.lastIndexOf("/");
  const filename = lastSlash >= 0 ? filePath.slice(lastSlash + 1) : filePath;
  if (!filename.startsWith("transcript_")) {
    throw new Error('Invalid file path: filename must start with "transcript_"');
  }
  return filePath;
}

export { parseUrlPath as a, buildTranscriptUrl as b, normalizeClientFilePath as n, page as p };
//# sourceMappingURL=file-utils-D1ajqP8K.js.map
