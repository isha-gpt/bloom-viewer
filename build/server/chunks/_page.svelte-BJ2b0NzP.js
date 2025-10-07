import { x as push, F as attr, z as pop } from './index-CeukPVPf.js';

function _page($$payload, $$props) {
  push();
  let loading = false;
  $$payload.out += `<div class="max-w-3xl mx-auto p-6 space-y-6"><h1 class="text-2xl font-bold">Bulk Load Perf Test</h1> <p class="text-sm opacity-70">Measures TTFB, download, decode, and parse for a single bulk metadata request.</p> <div class="flex items-center gap-3"><button class="btn btn-primary btn-sm"${attr("disabled", loading, true)}>`;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `Run Test`;
  }
  $$payload.out += `<!--]--></button> <code class="text-xs opacity-70">/api/transcripts/list</code></div> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BJ2b0NzP.js.map
