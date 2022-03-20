import type { Update } from "./types";

import { reconcileAttributes } from "./reconcile-attributes";
import {
  isChild,
  isComponent,
  isElement,
  isParent,
  isText,
} from "./util/type-guards";
import { commitChildren } from "./commit-children";

export const performCommits = (update: Update) => {
  for (const node of update.needsCommit) {
    if (node.needsCommit) {
      console.log("comitting", node);

      if (isText(node)) {
        if (typeof node.pendingVDom !== "undefined") {
          node.dom.textContent = String(node.pendingVDom);
        }
      } else if (isElement(node)) {
        if (typeof node.pendingVDom !== "undefined") {
          reconcileAttributes(
            node.dom,
            node.pendingVDom.props,
            node.vdom.props
          );
        }
      } else if (isComponent(node)) {
        update.needsEffects.push(node);
      }

      if (isParent(node)) {
        commitChildren(node);
      }

      if (isChild(node)) {
        if (typeof node.pendingVDom !== "undefined") {
          node.vdom = node.pendingVDom;
          node.pendingVDom = undefined;
        }
      }

      node.needsCommit = false;
    }
  }
};
