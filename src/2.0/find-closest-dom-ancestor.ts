import type { Node } from "./types";

import { assert } from "./util/assert";
import { isChild, isDomLiteral } from "./util/type-guards";

export const findClosestDomAncestor = (node: Node) => {
  let current = node;
  
  while (!isDomLiteral(current)) {
    assert(isChild(current), "no dom ancestor found");

    current = current.parent;
  }

  return current.dom;
};
