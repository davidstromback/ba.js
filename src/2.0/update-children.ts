import type { Update, Parent } from "./types";

import { findClosestDomAncestor } from "./find-closest-dom-ancestor";
import { prepareToUnmountChild } from "./prepare-to-unmount-child";
import { unmountChild } from "./unmount-child";
import { updateChild } from "./update-child";
import { createChild } from "./create-child";
import { mapChildren, mapVDOMChildren } from "./map-children";
import { getCurrentUpdate } from "./dispatch";

const { hasOwnProperty } = Object.prototype;

export function updateChildren(parent: Parent) {
  const { needsUpdate } = getCurrentUpdate();
  const { children, pendingChildren } = parent;

  // No child updates pending for this parent.
  if (typeof pendingChildren === "undefined") return;

  parent.pendingChildren = undefined;

  // Single child happy path.
  if (pendingChildren.length === 1 && children.length === 1) {
    updateChild(children[0], pendingChildren[0]);

    return;
  }

  // No need for diffing if ALL children are being unmounted.
  if (pendingChildren.length === 0) {
    for (const child of children) {
      prepareToUnmountChild(child);

      unmountChild(child, findClosestDomAncestor(child.parent));
    }

    children.length = 0;

    return;
  }

  // If no previous children exist when can treat this as a first mount.
  if (children.length === 0) {
    for (let index = 0; index < pendingChildren.length; index++) {
      const child = createChild(pendingChildren[index], parent, index);

      if (child.needsUpdate) {
        needsUpdate.push(child);
      }

      children.push(child);
    }

    return;
  }

  const prevChildMap = mapChildren(children);
  const nextChildMap = mapVDOMChildren(pendingChildren);
  const prevKeys = Object.keys(prevChildMap);
  const nextKeys = Object.keys(nextChildMap);
  const domParent = findClosestDomAncestor(parent);

  for (let index = 0; index < prevKeys.length; index++) {
    const key = prevKeys[index];
    
    if (!hasOwnProperty.call(nextChildMap, key)) {
      const child = prevChildMap[key];

      prepareToUnmountChild(child);

      unmountChild(child, domParent);

      children.splice(index, 1);
    }
  }

  for (let index = 0; index < nextKeys.length; index++) {
    const key = nextKeys[index];
    const vdom = nextChildMap[key];

    if (hasOwnProperty.call(prevChildMap, key)) {
      const child = prevChildMap[key];

      child.index = index;

      updateChild(child, vdom);
    } else {
      const child = createChild(vdom, parent, index);

      needsUpdate.push(child);

      children.splice(index, 0, child);
    }
  }
}
