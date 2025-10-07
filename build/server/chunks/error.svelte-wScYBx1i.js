import { x as push, J as escape_html, z as pop, K as getContext } from './index-CeukPVPf.js';
import { s as stores } from './client-DCZcF6HN.js';
import '@sveltejs/kit/internal';
import './exports-Cv9LZeD1.js';
import './index2-uppKP1uk.js';

({
  check: stores.updated.check
});
function context() {
  return getContext("__request__");
}
const page$1 = {
  get error() {
    return context().page.error;
  },
  get status() {
    return context().page.status;
  }
};
const page = page$1;
function Error$1($$payload, $$props) {
  push();
  $$payload.out += `<h1>${escape_html(page.status)}</h1> <p>${escape_html(page.error?.message)}</p>`;
  pop();
}

export { Error$1 as default };
//# sourceMappingURL=error.svelte-wScYBx1i.js.map
