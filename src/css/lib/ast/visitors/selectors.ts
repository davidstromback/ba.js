import type { Node } from "../../types";
import type { Visitor } from "../../util/visit";

import { findClosestDeclarationBlock } from "./split";

const matchAmpSeparator = /\s*&\s*/g;

const join = (a: string, b: string) => b.startsWith(":") ? a + b : a + " " + b;

export const selectors: Visitor<Node> = (node) => {
  if (node.type === "declarationBlock") {
    node.selector = node.selector.trim();
    let currentParent = findClosestDeclarationBlock(node.parent);

    if (typeof currentParent !== "undefined") {
      const parts = node.selector.trim().split(matchAmpSeparator, 2);

      if (parts.length === 2) {
        const [prepend, append] = parts;
        node.selector = join(prepend, join(currentParent.selector, append));
        currentParent = findClosestDeclarationBlock(currentParent.parent);
      }
    }
    
    while (typeof currentParent !== "undefined") {
      node.selector = join(currentParent.selector, node.selector);
      currentParent = findClosestDeclarationBlock(currentParent.parent);
    }
  }
};
