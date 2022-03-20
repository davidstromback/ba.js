import type { Child, DOMNode } from "./types";

import { findNextDomSibling } from "./find-next-dom-sibling";
import { isDomLiteral, isElement, isParent } from "./util/type-guards";
import { setAttributes } from "./reconcile-attributes";

const queue: Array<Child> = [];

export function placeChild(child: Child, domParent: DOMNode) {
  let current: Child | undefined = child;
  let nextSibling = findNextDomSibling(child);

  do {
    if (isDomLiteral(current)) {
      if (
        isElement(current) &&
        !current.mounted &&
        typeof current.pendingVDom === "undefined"
      ) {
        setAttributes(current.dom, current.vdom.props);
      }

      if (typeof nextSibling !== "undefined") {
        domParent.insertBefore(current.dom, nextSibling);
      } else {
        domParent.appendChild(current.dom);
      }

      current.mounted = true;

      nextSibling = current.dom;
    } else if (isParent(current)) {
      queue.push(...current.children);
    }

    current = queue.pop();
  } while (typeof current !== "undefined");
}
