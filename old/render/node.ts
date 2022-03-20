import type { VDOMChild, VDOMText } from "../vdom";
import type { ChildInstance, NodeInstance, ParentInstance } from "./types";

import { NODE } from "./types";
import { getParentDomNode, insertDomNode, removeDomNode } from "./child";

export function isNodeVDom(vdom: VDOMChild): vdom is string | number {
  return typeof vdom === "string" || typeof vdom === "number";
}

export function isNodeInstance(
  instance: ChildInstance
): instance is NodeInstance {
  return instance.type === NODE;
}

export function createNode(
  parent: ParentInstance,
  vdom: VDOMText
): NodeInstance {
  return {
    type: NODE,
    domNode: document.createTextNode(vdom.toString()),
    vdom: vdom.toString(),
    parent,
  };
}

export function mountNode(node: NodeInstance, insertBefore?: Node): void {
  const { domNode } = node;

  insertDomNode(getParentDomNode(node), domNode, insertBefore);
}

export function updateNode(node: NodeInstance, nextVDom: VDOMText): void {
  const { domNode, vdom: prevText } = node;
  const nextText = nextVDom.toString();

  if (prevText !== nextText) {
    node.vdom = nextText;
    domNode.textContent = nextText;
  }
}

export function unmountNode(node: NodeInstance): void {
  const { domNode } = node;

  removeDomNode(getParentDomNode(node), domNode);
}
