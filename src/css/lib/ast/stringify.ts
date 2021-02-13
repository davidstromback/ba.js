import type { Child, Node, Value } from "../types";

const asString = (value: Value) => {
  return Array.isArray(value) ? value.join(" ") : value.toString();
};

export const stringify = (() => {
  let buffer: string[] = [];

  const inner = (node: Node) => {
    for (const [key, value] of node.declarations) {
      buffer.push(key, ":", asString(value), ";\n");
    }

    for (const child of node.children) {
      outer(child);
    }
  };

  const outer = (node: Child) => {
    buffer.push(node.selector + "{\n");
    inner(node);
    buffer.push("}\n");
  };

  return (root: Node) => {
    console.log(root);
    buffer = [];

    inner(root);

    return buffer.join("");
  };
})();
