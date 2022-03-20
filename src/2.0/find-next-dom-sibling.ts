import type { DOMNode, Node } from "./types";

import { findClosestDomDescendant } from "./find-closest-dom-descendant";
import { isChild, isDomLiteral } from "./util/type-guards";

export function findNextDomSibling(node: Node): DOMNode | undefined {
  let current: Node | undefined = node;

  while (isChild(current)) {
    const { children } = current.parent;

    for (let i = current.index + 1; i < children.length; i++) {
      const sibling = children[i];
      const dom = findClosestDomDescendant(sibling);

      if (typeof dom !== "undefined") {
        return dom;
      }
    }

    if (isDomLiteral(current.parent)) {
      return undefined;
    }

    current = current.parent;
  }

  return undefined;
}
