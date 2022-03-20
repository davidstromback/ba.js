import { dispatch } from "./dispatch";
import { DOMElement, Root, VDOMChildren } from "./types";
import { ROOT } from "./util/type-guards";
import { sanitize } from "./vdom";

const createRoot = (dom: DOMElement, vdom: VDOMChildren): Root => ({
  type: ROOT,
  dom,
  children: [],
  mounted: false,
  unmounting: false,
  needsUpdate: true,
  needsCommit: true,
  pendingChildren: sanitize(vdom),
});

export function render(getDomNode: () => Element, vdom: VDOMChildren) {
  document.addEventListener(
    "DOMContentLoaded",
    () => {
      dispatch((update) => {
        update.needsUpdate.push(createRoot(getDomNode(), vdom));
      });
    },
    false
  );
}
