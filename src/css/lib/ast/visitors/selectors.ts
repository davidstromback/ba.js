import type { Node } from "../../types";
import type { Visitor } from "../util/visit";

import { DECLARATION_BLOCK, findClosestDeclarationBlock } from "../node";

const matchAmpSeparator = /\s*&\s*/g;

const isPseudoClass = (selector: string) => selector.slice(0, 1) === ":"

const join = (a: string, b: string) => isPseudoClass(b) ? a + b : a + " " + b;

export const selectors: Visitor<Node> = (node) => {
  if (node.type === DECLARATION_BLOCK) {
    const { selector, parent } = node;

    let currentParent = findClosestDeclarationBlock(parent);

    if (typeof currentParent !== "undefined") {
      const parts = selector.split(matchAmpSeparator, 2);

      if (parts.length === 2) {
        node.selector = join(parts[0], join(currentParent.selector, parts[1]));
        currentParent = findClosestDeclarationBlock(currentParent.parent);
      }
    }

    while (typeof currentParent !== "undefined") {
      node.selector = join(currentParent.selector, node.selector);
      currentParent = findClosestDeclarationBlock(currentParent.parent);
    }
  }
};