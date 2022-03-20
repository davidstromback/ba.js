import type { Node } from "../types";

import { isComponent } from "../component";
import { isElement } from "../element";
import { isRoot } from "../root";
import { isText } from "../text";

export const displayName = (node: Node) => {
  if (isText(node)) {
    return "text";
  }

  if (isComponent(node)) {
    return `component${node.vdom.type.name ? `(${node.vdom.type.name})` : ""}`;
  }

  if (isElement(node)) {
    return `element(${node.vdom.type})`;
  }

  if (isRoot(node)) {
    return "root";
  }

  throw new Error("node type not recognized");
};
