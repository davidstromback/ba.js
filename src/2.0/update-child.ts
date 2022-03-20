import { Update, Child, VDOM } from "./types";

import { createChild } from "./create-child";
import { findClosestDomAncestor } from "./find-closest-dom-ancestor";
import { prepareToUnmountChild } from "./prepare-to-unmount-child";
import { unmountChild } from "./unmount-child";
import { isComponent, isElement, isText, isFragment } from "./util/type-guards";
import {
  isVDOMComponent,
  isVDOMElement,
  isVDOMText,
  isVDOMFragment,
} from "./vdom";
import { getCurrentUpdate } from "./dispatch";

function shouldReplaceChild(child: Child, vdom: VDOM) {
  if (isComponent(child)) {
    return !isVDOMComponent(vdom) || child.vdom.type !== vdom.type;
  }

  if (isElement(child)) {
    return !isVDOMElement(vdom) || child.vdom.type !== vdom.type;
  }

  if (isText(child)) {
    return !isVDOMText(vdom);
  }

  if (isFragment(child)) {
    return !isVDOMFragment(vdom);
  }

  return false;
}

export function updateChild(child: Child, vdom: VDOM) {
  const { parent, index } = child;
  const { needsUpdate } = getCurrentUpdate();

  if (shouldReplaceChild(child, vdom)) {
    console.log("replacing", child, vdom);

    prepareToUnmountChild(child);

    unmountChild(child, findClosestDomAncestor(parent));

    child = createChild(vdom, parent, index);

    parent.children[index] = child;
  } else {
    child.pendingVDom = vdom;
  }

  needsUpdate.push(child);
  child.needsUpdate = true;
}
