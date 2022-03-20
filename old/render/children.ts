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

const { hasOwnProperty } = Object.prototype;

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

  const a = byKey[aKey];
  const b = byKey[bKey];

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
  const child = byKey[key];

  prepareToUnmountChild(child);

  delete byKey[key];
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
    const prevSibling = byKey[keys[index - 1]];

    prevSibling.nextSibling = child;
    child.prevSibling = prevSibling;
  }

  byKey[key] = child;
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
    const nextSibling = byKey[keys[index]];
    nextSibling.prevSibling = child;
    child.nextSibling = nextSibling;
  }

  if (index > 0) {
    const prevSibling = byKey[keys[index - 1]];
    prevSibling.nextSibling = child;
    child.prevSibling = prevSibling;
  }

  byKey[key] = child;
  keys.splice(index, 0, key);

  mountChild(child, getNextSiblingDomNode(child));
}

export function getExplicitKey(child: VDOMChild) {
  return isNodeVDom(child) ? undefined : child.key?.toString();
}

export const isValidChild = (
  child?: VDOMChild | false | null | undefined
): child is VDOMChild => {
  return child !== false && child !== null && child !== undefined;
};

const emptyChildren: VDOMChild[] = [];

export const sanitizeVDOMChildren = (children?: VDOMChildren): VDOMChild[] => {
  if (typeof children === "undefined") {
    return emptyChildren;
  }

  return children.filter(isValidChild);
};

export function createChildren(parent: ElementInstance): Children {
  return {
    parent,
    byKey: {},
    keys: [],
  };
}

const getChildMap = <T = VDOMChild>(
  children: VDOMChildren,
  mapFn?: (child: VDOMChild, key: string | number) => T
): Record<string, T> => {
  const map: Record<string, any> = {};
  let nextImplicitKey = 0;

  children.forEach((child) => {
    if (isValidChild(child)) {
      const explicitKey = getExplicitKey(child);
      const key = explicitKey
        ? "e-" + explicitKey
        : "i-" + nextImplicitKey++;

      if (hasOwnProperty.call(map, key)) {
        throw new TypeError(`keys must be unique, found duplicate key ${key}`);
      }

      map[key] = mapFn ? mapFn(child, key) : child;
    }
  });

  return map;
};

export function mountChildren(children: Children, vdomChildren: VDOMChild[]) {
  const { parent } = children;
  const childMap = getChildMap(vdomChildren);
  const keys = Object.keys(childMap);
  const { length } = keys;

  for (let i = 0; i < length; i++) {
    const key = keys[i];
    const vdom = childMap[key];
    appendChild(children, createChild(parent, vdom), key);
  }
}

export function updateChildren(children: Children, vdomChildren: VDOMChild[]) {
  const { keys, parent, byKey } = children;
  const nextChildMap = getChildMap(vdomChildren);
  const nextKeys = Object.keys(nextChildMap);

  for (let l = keys.length, i = 0; i < l; i++) {
    if (!hasOwnProperty.call(nextChildMap, keys[i])) {
      removeChild(children, i);
      i--;
      l--;
    }
  }

  const indexByKey = Object.fromEntries(keys.map((key, index) => [key, index]));
  let insertCount = 0

  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    const vdom = nextChildMap[key];

    if (!hasOwnProperty.call(byKey, key)) {
      insertChildAt(children, createChild(parent, vdom), key, i);
      insertCount++
    } else {
      const currentKeyAtIndex = keys[i];
      
      if (currentKeyAtIndex !== key) {
        swapChildren(children, i, indexByKey[key] + insertCount);
        indexByKey[currentKeyAtIndex] = indexByKey[key];
        indexByKey[key] = i;
      }

      updateChild(byKey[key], vdom);
    }
  }
}

export function prepareToUnmountChildren(children: Children) {
  const { keys, byKey } = children;

  keys.forEach((key) => {
    prepareToUnmountChild(byKey[key]);
  });
}
