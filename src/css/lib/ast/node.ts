import type { Child, Literal, Node, Value } from "../types";

export const ROOT = 0;
export const DECLARATION_BLOCK = 1;
export const NESTED_AT_RULE = 2;

export const getType = (selector: string) => {
  if (selector.slice(0, 1) === "@") {
    return NESTED_AT_RULE;
  }

  return DECLARATION_BLOCK;
};

export const createNode = <T extends number, V, S, P>(
  type: T,
  value: V,
  selector: S,
  parent: P
) => {
  const declarations: [string, Value][] = [];
  const children: Child[] = [];

  return { type, value, parent, selector, declarations, children };
};

export const findRootOrClosestAtRule = (node: Node) => {
  while (node.type === DECLARATION_BLOCK) {
    node = node.parent;
  }

  return node;
};

export const findClosestDeclarationBlock = (node: Node) => {
  while (node.type !== ROOT) {
    if (node.type === DECLARATION_BLOCK) {
      return node;
    }

    node = node.parent;
  }

  return undefined;
};
