import type { Node } from "../../types";
import type { Visitor } from "../../util/visit";

import { createChild } from "../node";

export const parse: Visitor<Node> = (node) => {
  for (const key of Object.keys(node.value)) {
    const value = node.value[key];
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      Array.isArray(value)
    ) {
      node.declarations.push([key, value]);
    } else if (typeof value === "object" && value !== null) {
      const type = key.startsWith("@") ? "nestedAtRule" : "declarationBlock";
      node.children.push(createChild(type, value, key, node));
    }
  }
};
