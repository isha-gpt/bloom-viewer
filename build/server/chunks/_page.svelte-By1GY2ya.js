import { x as push, J as escape_html, z as pop } from './index-CeukPVPf.js';
import { c as createTranscriptLoader } from './transcript.svelte-BEaYfmNG.js';

function _page($$payload, $$props) {
  push();
  const testFilePath = "transcripts/test/transcript_2025-07-30_19-19-00_af5163dd.json";
  const loader = createTranscriptLoader(testFilePath);
  let metadataTest = "Not started";
  let transcriptTest = "Not started";
  $$payload.out += `<div class="p-8"><div class="breadcrumbs text-sm mb-4"><ul><li><a href="/">Home</a></li> <li><a href="/demo">Demo</a></li> <li>API Test</li></ul></div> <h1 class="text-2xl font-bold mb-6">Client Utils API Test</h1> <p class="mb-4 text-base-content/70">Testing the client-side transcript loader utilities from the new organized structure.</p> <div class="space-y-4"><div class="card bg-base-200 p-4"><h2 class="text-lg font-semibold mb-2">Test File Path</h2> <code class="text-sm">transcripts/test/transcript_2025-07-30_19-19-00_af5163dd.json</code> <p class="text-xs text-base-content/60 mt-2">Using: <code>$lib/client/utils/transcript.svelte</code></p></div> <div class="card bg-base-200 p-4"><h2 class="text-lg font-semibold mb-2">Metadata Loading Test</h2> <p class="mb-2">Status: ${escape_html(metadataTest)}</p> <button class="btn btn-primary">Test Load Metadata</button> `;
  if (loader.metadataLoading) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span class="loading loading-spinner loading-sm ml-2"></span>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (loader.metadataError) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="text-error mt-2">${escape_html(loader.metadataError)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="card bg-base-200 p-4"><h2 class="text-lg font-semibold mb-2">Full Transcript Loading Test</h2> <p class="mb-2">Status: ${escape_html(transcriptTest)}</p> <button class="btn btn-primary">Test Load Transcript</button> `;
  if (loader.transcriptLoading) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span class="loading loading-spinner loading-sm ml-2"></span>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (loader.transcriptError) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="text-error mt-2">${escape_html(loader.transcriptError)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="card bg-base-200 p-4"><h2 class="text-lg font-semibold mb-2">Loader State</h2> <ul class="text-sm space-y-1"><li>Has Metadata: ${escape_html(loader.hasMetadata)}</li> <li>Has Transcript: ${escape_html(loader.hasTranscript)}</li> <li>Is Loading: ${escape_html(loader.isLoading)}</li> <li>Has Error: ${escape_html(loader.hasError)}</li></ul></div> `;
  if (loader.metadata) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="card bg-base-200 p-4"><h2 class="text-lg font-semibold mb-2">Loaded Metadata</h2> <pre class="text-xs overflow-auto">${escape_html(JSON.stringify(loader.metadata, null, 2))}</pre></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (loader.transcript) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="card bg-base-200 p-4"><h2 class="text-lg font-semibold mb-2">Loaded Transcript Summary</h2> <ul class="text-sm space-y-1"><li><strong>ID:</strong> ${escape_html(loader.transcript.id)}</li> <li><strong>Model:</strong> ${escape_html(loader.transcript.model)}</li> <li><strong>Split:</strong> ${escape_html(loader.transcript.split)}</li> <li><strong>Summary:</strong> ${escape_html(loader.transcript.summary)}</li> <li><strong>Concerning Score:</strong> ${escape_html(loader.transcript.concerningScore)}</li> <li><strong>Event Count:</strong> ${escape_html(loader.transcript.transcript.events.length)}</li></ul></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-By1GY2ya.js.map
