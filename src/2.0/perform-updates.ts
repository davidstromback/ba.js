import type { Update } from "./types";

import { isProvideContext, renderWithHooks } from "./hooks";
import { safelyUpdateOptionalRef } from "./ref";
import {
  isComponent,
  isElement,
  isFragment,
  isParent,
} from "./util/type-guards";
import { sanitize } from "./vdom";
import { updateChildren } from "./update-children";

export const performUpdates = (update: Update) => {
  const { needsUpdate, needsCommit } = update;

  let node = needsUpdate.pop();
  while (typeof node !== "undefined") {
    console.log("updating", node);

    if (node.needsUpdate) {
      needsCommit.push(node);
      node.needsUpdate = false;
      node.needsCommit = true;

      if (isFragment(node) && typeof node.pendingVDom !== "undefined") {
        node.pendingChildren = sanitize(node.pendingVDom.children);
      } else if (isElement(node) && typeof node.pendingVDom !== "undefined") {
        safelyUpdateOptionalRef(node.pendingVDom.props.ref, node.dom);
        node.pendingChildren = sanitize(node.pendingVDom.props.children);
      } else if (isComponent(node)) {
        node.pendingChildren = sanitize(
          renderWithHooks(
            node,
            node.pendingVDom?.props ?? node.vdom.props,
            false
          )
        );
      }

      if (isParent(node)) {
        updateChildren(node);
      }
    }

    node = needsUpdate.pop();
  }
};
