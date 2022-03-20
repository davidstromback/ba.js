import type { Child, Parent } from "./types";

import { findClosestDomAncestor } from "./find-closest-dom-ancestor";
import { placeChild } from "./place-child";

const mapIndexes = (children: Array<Child>) => {
  const map: Record<number, number> = {};

  for (let i = 0; i < children.length; i++) {
    map[children[i].index] = i;
  }

  return map;
};

const reordered = new Set<Child>();

export const commitChildren = (parent: Parent) => {
  const { children } = parent;
  const domParent = findClosestDomAncestor(parent);
  const indexMap = mapIndexes(children);

  reordered.clear();

  for (let i = children.length - 1; i >= 0; i--) {
    const j = indexMap[i];
    const child = children[j];

    if (i !== j) {
      const other = children[i];

      indexMap[other.index] = j;
      children[i] = child;
      children[j] = other;

      reordered.add(child);
      reordered.add(other);
    }

    if (!child.mounted || reordered.has(child)) {
      placeChild(child, domParent);
    }
  }
};
