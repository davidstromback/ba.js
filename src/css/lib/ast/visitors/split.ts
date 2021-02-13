import type { Node } from "../../types";
import type { Visitor } from "../../util/visit";

import { createChild } from "../node";

export const findClosestDeclarationBlock = (node: Node) => {
  while (node.type !== "root") {
    if (node.type === "declarationBlock") {
      return node;
    }
    node = node.parent;
  }
  return undefined;
};

export const split: Visitor<Node> = (node) => {
  if (node.type === "nestedAtRule") {
    const parentBlock = findClosestDeclarationBlock(node.parent);

    if (parentBlock && node.declarations.length > 0) {
      const declarationsAsChild = createChild(
        "declarationBlock",
        Object.fromEntries(node.declarations),
        parentBlock.selector,
        node
      );
      node.children.unshift(declarationsAsChild);
      node.declarations = [];
    }
  }
};
