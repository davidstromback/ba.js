import type { Node } from "../../types";
import type { Visitor } from "../../util/visit";

const findRootOrClosestAtRule = (node: Node) => {
  while (node.type === "declarationBlock") {
    node = node.parent;
  }
  return node;
};

export const hoist: Visitor<Node> = (node) => {
  if (node.type !== "root") {
    const root = findRootOrClosestAtRule(node.parent);

    if (root !== node.parent) {
      node.parent.children.splice(node.parent.children.indexOf(node), 1);
      node.parent = root;
      root.children.push(node);
    }
  }
};
