import {
  Child,
  Component,
  Context,
  ContextProvider,
  DOMLiteral,
  Element,
  Fragment,
  Node,
  Parent,
  Root,
  Text,
} from "../types";

const createGuardFromType = <T extends Node>(type: number) => {
  return (node: Node): node is T => node.type === type;
};

const createGuardFromMask = <T extends Node>(mask: number) => {
  return (node: Node): node is T => Boolean(node.type & mask);
};

export const ROOT = 0b101;
export const COMPONENT = 0b110;
export const ELEMENT = 0b111;
export const FRAGMENT = 0b1110;
export const CONTEXT = 0b11110;
export const TEXT = 0b011;

export const isRoot = createGuardFromType<Root>(ROOT);
export const isComponent = createGuardFromType<Component>(COMPONENT);
export const isElement = createGuardFromType<Element>(ELEMENT);
export const isFragment = createGuardFromType<Fragment>(FRAGMENT);
export const isContextProvider = createGuardFromType<ContextProvider>(CONTEXT);
export const isText = createGuardFromType<Text>(TEXT);

export const isDomLiteral = createGuardFromMask<DOMLiteral>(0b1 << 0);
export const isChild = createGuardFromMask<Child>(0b1 << 1);
export const isParent = createGuardFromMask<Parent>(0b1 << 2);
