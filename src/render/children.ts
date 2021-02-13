import type { VDOMChild, VDOMChildren } from "../vdom";
import type { ChildInstance, Children, ElementInstance } from "./types";

import { isNodeVDom } from "./node";
import {
  createChild,
  mountChild,
  updateChild,
  prepareToUnmountChild,
  unmountChild,
  insertDomNode,
  getParentDomNode,
  getChildDomNode,
  getNextSiblingDomNode,
} from "./child";

function intersect<T>(a: T[], b: T[]): T[] {
  return a.filter((k) => b.includes(k));
}

function diff<T>(a: T[], b: T[]): T[] {
  return a.filter((k) => !b.includes(k));
}

function swapChildren(
  children: Children,
  aIndex: number,
  bIndex: number
): void {
  const { keys, byKey } = children;
  const aIdx = Math.min(aIndex, bIndex);
  const bIdx = Math.max(aIndex, bIndex);

  const aKey = keys[aIdx];
  const bKey = keys[bIdx];

  const a = byKey.get(aKey)!;
  const b = byKey.get(bKey)!;

  const { prevSibling: aPrevSibling, nextSibling: aNextSibling } = a;
  const { prevSibling: bPrevSibling, nextSibling: bNextSibling } = b;

  if (aNextSibling) {
    aNextSibling.prevSibling = b;
  }

  if (bNextSibling) {
    bNextSibling.prevSibling = a;
  }

  if (aPrevSibling) {
    aPrevSibling.nextSibling = b;
  }

  if (bPrevSibling) {
    bPrevSibling.prevSibling = a;
  }

  a.nextSibling = bNextSibling;
  b.prevSibling = aPrevSibling;

  if (aNextSibling === b) {
    a.prevSibling = b;
    b.nextSibling = a;
  } else {
    a.prevSibling = bPrevSibling;
    b.nextSibling = aNextSibling;
  }

  keys[aIdx] = bKey;
  keys[bIdx] = aKey;

  const parentDomNode = getParentDomNode(a);
  const aDomNode = getChildDomNode(a);
  const bDomNode = getChildDomNode(b);

  if (typeof aDomNode !== "undefined") {
    insertDomNode(parentDomNode, aDomNode, getNextSiblingDomNode(a));
  }

  if (typeof bDomNode !== "undefined") {
    insertDomNode(parentDomNode, bDomNode, getNextSiblingDomNode(b));
  }
}

function removeChild(children: Children, index: number): void {
  const { keys, byKey } = children;
  const key = keys[index];
  const child = byKey.get(key)!;

  prepareToUnmountChild(child);

  byKey.delete(key);
  keys.splice(index, 1);

  const { prevSibling, nextSibling } = child;

  if (typeof prevSibling !== "undefined") {
    prevSibling.nextSibling = nextSibling;
  }

  if (typeof nextSibling !== "undefined") {
    nextSibling.prevSibling = prevSibling;
  }

  unmountChild(child);
}

function appendChild(
  children: Children,
  child: ChildInstance,
  key: string | number
): void {
  const { keys, byKey } = children;
  const index = keys.length;

  if (index > 0) {
    const prevSibling = byKey.get(keys[index - 1])!;

    prevSibling.nextSibling = child;
    child.prevSibling = prevSibling;
  }

  byKey.set(key, child);
  keys.push(key);

  mountChild(child);
}

function insertChildAt(
  children: Children,
  child: ChildInstance,
  key: string | number,
  index: number
): void {
  const { keys, byKey } = children;

  if (index < keys.length) {
    const nextSibling = byKey.get(keys[index])!;
    nextSibling.prevSibling = child;
    child.nextSibling = nextSibling;
  }

  if (index > 0) {
    const prevSibling = byKey.get(keys[index - 1])!;
    prevSibling.nextSibling = child;
    child.prevSibling = prevSibling;
  }

  byKey.set(key, child);
  keys.splice(index, 0, key);

  mountChild(child, getNextSiblingDomNode(child));
}

export function getExplicitKey(child: VDOMChild) {
  return isNodeVDom(child) ? undefined : child.key?.toString();
}

function getKeys(children: VDOMChild[]) {
  const keys: (string | number)[] = [];
  let nextImplicitKey = 0;

  for (const child of children) {
    const key = getExplicitKey(child) ?? nextImplicitKey++;

    if (keys.includes(key)) {
      throw new Error(`Duplicate key "${key}", keys must be unique.`);
    }

    keys.push(key);
  }

  return keys;
}

export const isValidChild = (
  child?: VDOMChild | false | null | undefined
): child is VDOMChild => {
  return child !== false && child !== null && child !== undefined;
};

export const sanitizeVDOMChildren = (children: VDOMChildren): VDOMChild[] => {
  return children.filter(isValidChild);
};

export function createChildren(parent: ElementInstance): Children {
  return {
    parent,
    byKey: new Map(),
    keys: [],
  };
}

export function mountChildren(children: Children, vdomChildren: VDOMChild[]) {
  const { parent } = children;

  getKeys(vdomChildren).forEach((key, index) =>
    appendChild(children, createChild(parent, vdomChildren[index]), key)
  );
}

export function updateChildren(children: Children, vdomChildren: VDOMChild[]) {
  const { keys, parent, byKey } = children;

  const nextKeys = getKeys(vdomChildren);

  diff(keys, nextKeys).forEach((key) => {
    removeChild(children, keys.indexOf(key));
  });

  intersect(nextKeys, keys).forEach((key, nextIndex) => {
    const child = byKey.get(key)!;
    const vdom = vdomChildren[nextKeys.indexOf(key)];
    const currentIndex = keys.indexOf(key);

    if (nextIndex !== currentIndex) {
      swapChildren(children, nextIndex, currentIndex);
    }

    updateChild(child, vdom);
  });

  diff(nextKeys, keys).forEach((key) => {
    const index = nextKeys.indexOf(key);
    const child = createChild(parent, vdomChildren[index]);

    insertChildAt(children, child, key, index);
  });
}

export function prepareToUnmountChildren(children: Children) {
  const { keys, byKey } = children;

  keys.forEach((key) => {
    const child = byKey.get(key)!;

    prepareToUnmountChild(child);
  });
}
