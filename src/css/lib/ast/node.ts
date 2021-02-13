import type { Literal, Node, Child, Root } from "../types";

export const createRoot = (value: Literal): Root => {
  return { type: "root", value, declarations: [], children: [] };
};

export const createChild = (
  type: Child['type'],
  value: Literal,
  selector: string,
  parent: Node
): Child => {
  return { type, value, parent, selector, declarations: [], children: [] };
};
