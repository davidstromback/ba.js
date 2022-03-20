import type { Node } from "../../types";
import type { Visitor } from "../util/visit";

import { ROOT, findRootOrClosestAtRule } from "../node";

export const hoist: Visitor<Node> = (node) => {
  if (node.type !== ROOT) {
    const { parent } = node;
    const rootOrAtRule = findRootOrClosestAtRule(parent);

    if (rootOrAtRule !== parent) {
      const { children: parentChildren } = parent;

      parentChildren.splice(parentChildren.indexOf(node), 1);
      node.parent = rootOrAtRule;
      rootOrAtRule.children.push(node);
    }
  }
};
