import type { Node } from "./types";

import { isDomLiteral, isParent } from "./util/type-guards";

export function findClosestDomDescendant(child: Node) {
  let current = child;

  while (!isDomLiteral(current)) {
    if (isParent(current) && current.children.length > 0) {
      current = current.children[0];
    } else {
      return undefined;
    }
  }

  return current.dom;
}
