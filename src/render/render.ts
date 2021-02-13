import type { VDOMChild } from "../vdom";

import { createChild, mountChild } from "./child";
import { ROOT } from "./types";

export function render(vdom: VDOMChild, getDomNode: () => Element) {
  document.addEventListener(
    "DOMContentLoaded",
    () =>
      mountChild(
        createChild(
          { type: ROOT, domNode: getDomNode() },
          vdom
        )
      ),
    false
  );
}
