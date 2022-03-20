import type { Node } from "../../types";
import type { Visitor } from "../util/visit";

import {
  NESTED_AT_RULE,
  DECLARATION_BLOCK,
  findClosestDeclarationBlock,
  createNode,
} from "../node";

export const split: Visitor<Node> = (node) => {
  if (node.type === NESTED_AT_RULE) {
    const { declarations, children, parent } = node;
    const parentBlock = findClosestDeclarationBlock(parent);

    if (typeof parentBlock !== "undefined" && declarations.length > 0) {
      const { selector } = parentBlock;
      const value = Object.fromEntries(declarations);

      children.unshift(createNode(DECLARATION_BLOCK, value, selector, node));
      node.declarations = [];
    }
  }
};
