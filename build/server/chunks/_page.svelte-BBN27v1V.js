import { x as push, G as store_get, N as ensure_array_like, M as head, J as escape_html, F as attr, O as stringify, I as unsubscribe_stores, z as pop } from './index-CeukPVPf.js';
import { a as parseUrlPath, p as page } from './file-utils-D1ajqP8K.js';
import { T as TranscriptViewer } from './TranscriptViewer-BFV8H_4X.js';
import './client-DCZcF6HN.js';
import '@sveltejs/kit/internal';
import './exports-Cv9LZeD1.js';
import './index2-uppKP1uk.js';
import './transcript.svelte-BEaYfmNG.js';
import 'fast-json-patch';
import './theme--C4x6dAj.js';
import 'markdown-it';
import 'highlight.js/lib/core';
import 'highlight.js/lib/languages/python';
import 'highlight.js/lib/languages/bash';
import 'highlight.js/lib/languages/plaintext';
import './transcript-utils-BY7i01oF.js';

function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let filePath = (() => {
    const pathSegments = store_get($$store_subs ??= {}, "$page", page).params.path;
    if (!pathSegments) {
      return "";
    }
    const segments = Array.isArray(pathSegments) ? pathSegments : pathSegments.split("/").filter(Boolean);
    try {
      console.log("Parsing URL segments:", segments);
      const result = parseUrlPath(segments);
      console.log("Parsed file path:", result);
      return result;
    } catch (error) {
      console.error("Failed to parse URL path:", error);
      console.error("Segments were:", segments);
      return "";
    }
  })();
  let breadcrumbSegments = (() => {
    if (!filePath) return [];
    const pathParts = filePath.split("/");
    const segments = [];
    for (let i = 0; i < pathParts.length; i++) {
      const segment = pathParts[i];
      const isFile = i === pathParts.length - 1 && segment.endsWith(".json");
      let relativePath = pathParts.slice(0, i + 1).join("/");
      segments.push({
        name: segment,
        path: relativePath,
        isFile,
        isClickable: !isFile && i > 0
        // Only directories after rootDir are clickable
      });
    }
    return segments;
  })();
  let errorMessage = filePath ? "" : "Invalid transcript path";
  const each_array = ensure_array_like(breadcrumbSegments);
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>${escape_html(filePath ? `${filePath} - Petri Transcript Viewer` : "Petri Transcript Viewer")}</title>`;
  });
  $$payload.out += `<div class="min-h-screen bg-base-100"><div class="navbar bg-base-200"><div class="flex-1"><div class="breadcrumbs text-sm"><ul><li><a href="/" class="font-mono text-xs">Home</a></li> <!--[-->`;
  for (let index = 0, $$length = each_array.length; index < $$length; index++) {
    let segment = each_array[index];
    $$payload.out += `<li>`;
    if (segment.isFile) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span class="font-mono text-xs font-semibold">${escape_html(segment.name)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<a${attr("href", `/?path=${stringify(encodeURIComponent(segment.path))}`)} class="font-mono text-xs transition-colors"${attr("title", `View directory: ${stringify(segment.path)}`)}>${escape_html(segment.name)}</a>`;
    }
    $$payload.out += `<!--]--></li>`;
  }
  $$payload.out += `<!--]--></ul></div></div></div> <main class="py-6">`;
  if (errorMessage) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="p-4"><div class="alert alert-error max-w-2xl mx-auto"><svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> <span>${escape_html(errorMessage)}</span> <div><a href="/" class="btn btn-sm">Go Home</a></div></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    TranscriptViewer($$payload, { filePath });
  }
  $$payload.out += `<!--]--></main></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BBN27v1V.js.map
