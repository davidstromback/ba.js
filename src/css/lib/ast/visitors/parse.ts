import type { CallbackLiteral, Node } from "../../types";
import type { Visitor } from "../util/visit";

import { createNode, getType } from "../node";

export const parse =
  <T>(props: T): Visitor<Node<CallbackLiteral<T>>> =>
  (node) => {
    const { children, declarations, value: literal } = node;
    const keys = Object.keys(literal);
    const { length } = keys;

    for (let i = 0; i < length; i++) {
      const key = keys[i].trim();
      let value = literal[key];

      while (typeof value === "function") {
        value = value(props);
      }

      if (typeof value === "string" || typeof value === "number") {
        declarations.push([key, value]);
      } else if (
        typeof value === "object" &&
        !Array.isArray(value) &&
        value !== null
      ) {
        children.push(createNode(getType(key), value, key, node));
      }
    }
  };
