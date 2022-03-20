import type { VDOMChild, VDOMChildren } from "../vdom";
import type { ChildInstance, Children, ElementInstance, ParentInstance } from "./types";

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

function swapChildren(a: ChildInstance, b: ChildInstance): void {
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

function removeChild(child: ChildInstance): void {
  prepareToUnmountChild(child);

  const { prevSibling, nextSibling } = child;

  if (typeof prevSibling !== "undefined") {
    prevSibling.nextSibling = nextSibling;
  }

  if (typeof nextSibling !== "undefined") {
    nextSibling.prevSibling = prevSibling;
  }

  unmountChild(child);
}

function appendChild(child: ChildInstance, insertAfter?: ChildInstance): void {
  if (insertAfter) {
    const { nextSibling } = insertAfter;
    if (nextSibling) {
      nextSibling.prevSibling = child;
      child.nextSibling = nextSibling;
    }

    insertAfter.nextSibling = child;
    child.prevSibling = insertAfter;
  }

  mountChild(child, getNextSiblingDomNode(child));
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
      const key = explicitKey ? "e-" + explicitKey : "i-" + nextImplicitKey++;

      if (hasOwnProperty.call(map, key)) {
        throw new TypeError(`keys must be unique, found duplicate key ${key}`);
      }

      map[key] = mapFn ? mapFn(child, key) : child;
    }
  });

  return map;
};

const mergeChildMaps = (
  prev: Record<string, ChildInstance>,
  next: Record<string, ChildInstance>
) => {
  let deletedChildren: string[] = [];
  const deletedSiblingsByKey: Record<string, string[]> = {};
  const prevKeys = Object.keys(prev);
  const nextKeys = Object.keys(next);

  for (const key of prevKeys) {
    if (hasOwnProperty.call(next, key)) {
      if (deletedChildren.length) {
        deletedSiblingsByKey[key] = deletedChildren;
        deletedChildren = [];
      }
    } else {
      deletedChildren.push(key);
    }
  }

  const result: Record<string, ChildInstance> = {};

  const appendToResult = (key: string) => {
    result[key] = hasOwnProperty.call(next, key) ? next[key] : prev[key];
  };

  for (const key of nextKeys) {
    deletedSiblingsByKey[key]?.forEach(appendToResult);

    appendToResult(key);
  }

  deletedChildren.forEach(appendToResult);

  return result;
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

export function getNextChildMap(
    parent: ParentInstance,
  prevChildMap: Record<string, ChildInstance>,
  vdomChildren: VDOMChild[]
) {
  const nextChildMap = getChildMap(vdomChildren, (vdom, key) => {
      if (hasOwnProperty.call(prevChildMap, key)) {
        const child = prevChildMap[key];
        return child;
      }
      return createChild(parent, vdom)
  });
  const mergedChildMaps = mergeChildMaps(prevChildMap, nextChildMap);
  const mergedKeys = Object.keys(mergedChildMaps);
  const prevKeys = Object.keys(prevChildMap);

  let insertCount = 0;
  for (let i = 0; i < mergedKeys.length; i++) {
    const key = mergedKeys[i];
    const child = mergedChildMaps[key];
    
    if (!hasOwnProperty.call(nextChildMap, key)) {
        removeChild(child)
        continue;
    }

    if (!hasOwnProperty.call(prevChildMap, key)) {
        appendChild(child, mergedChildMaps[mergedKeys[i-1]])
        insertCount++;
        continue;
    }

    const indexInPrev = i - insertCount
    const prevKeyAtIndex = prevKeys[indexInPrev]
    const prevChildAtIndex = prevChildMap[prevKeyAtIndex]
    if (key !== prevKeyAtIndex) {
        swapChildren(child, prevChildAtIndex);
        prevKeys[indexInPrev] = key
        prevKeys[key]
    }

    updateChild(child, prevChildMap[]);
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
  let insertCount = 0;

  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    const vdom = nextChildMap[key];

    if (!hasOwnProperty.call(byKey, key)) {
      insertChildAt(children, createChild(parent, vdom), key, i);
      insertCount++;
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
