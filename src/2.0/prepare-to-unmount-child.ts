import type { Child, Update } from "./types";

import { isElement, isComponent, isParent } from "./util/type-guards";
import { performCleanups } from "./perform-cleanups";
import { safelyUpdateOptionalRef } from "./ref";

const queue: Array<Child> = [];
let current: Child | undefined;

export function prepareToUnmountChild(child: Child) {
  current = child;

  do {
      child.needsUpdate = false
      child.needsCommit = false

    if (isElement(current)) {
      safelyUpdateOptionalRef(current.vdom.props.ref, undefined);
    } else if (isComponent(current)) {
      current.unmounting = true;

      performCleanups(current);
    }

    if (isParent(current)) {
      queue.push(...current.children);
    }

    current = queue.shift();
  } while (typeof current !== "undefined");
}
