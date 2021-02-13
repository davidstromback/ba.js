import type { VDOMChild, VDOMElement } from "../vdom";
import type { ParentInstance, ElementInstance, ChildInstance } from "./types";

import { ELEMENT } from "./types";
import {
  updateChildren,
  createChildren,
  mountChildren,
  sanitizeVDOMChildren,
  prepareToUnmountChildren,
} from "./children";
import {
  getParentDomNode,
  insertDomNode,
  removeDomNode,
  replaceChild,
} from "./child";

const emptyObject = {};
const booleanAttributesSet = new Set([
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "contenteditable",
  "controls",
  "default",
  "defer",
  "disabled",
  "download",
  "draggable",
  "dropzone",
  "formnovalidate",
  "hidden",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "novalidate",
  "open",
  "readonly",
  "required",
  "reversed",
  "sandbox",
  "scoped",
  "selected",
  "spellcheck",
  "typemustmatch",
  "wrap",
]);

function replacer(match: string) {
  return "-" + match.toLowerCase();
}

export function camelToDash(camel: string) {
  return camel.replace(/[A-Z]/g, replacer);
}

function wasAdded(next: unknown, prev: unknown): boolean {
  return next !== undefined && prev === undefined;
}

function wasRemoved(next: unknown, prev: unknown): boolean {
  return next === undefined && prev !== undefined;
}

function wasChanged(next: unknown, prev: unknown): boolean {
  return prev !== undefined && !Object.is(prev, next);
}

function distinctKeys(...objects: Record<string, unknown>[]) {
  return new Set(objects.flatMap(Object.keys));
}

function updateStyleProperty(
  domNode: HTMLElement,
  property: string,
  next?: string,
  prev?: string
): void {
  if (wasRemoved(next, prev)) {
    domNode.style.removeProperty(property);
  }

  if (wasAdded(next, prev) || wasChanged(next, prev)) {
    domNode.style.setProperty(property, next!);
  }
}

function updateStyleAttribute(
  domNode: HTMLElement,
  next: Record<string, string> = emptyObject,
  prev: Record<string, string> = emptyObject
): void {
  const properties = distinctKeys(next, prev);

  properties.forEach((key) => {
    const property = camelToDash(key);

    updateStyleProperty(domNode, property, next[key], prev[key]);
  });
}

function updateEventAttribute(
  domNode: Element,
  key: string,
  next?: EventListener,
  prev?: EventListener
): void {
  const type = key.slice(2).toLowerCase();

  if (wasRemoved(next, prev) || wasChanged(next, prev)) {
    domNode.removeEventListener(type, prev!);
  }

  if (wasAdded(next, prev) || wasChanged(next, prev)) {
    domNode.addEventListener(type, next!);
  }
}

function updateBooleanAttribute(
  domNode: Element,
  key: string,
  next?: boolean,
  prev?: boolean
): void {
  if (wasRemoved(next, prev) || (wasChanged(next, prev) && next === false)) {
    domNode.removeAttribute(key);
  }

  if ((wasAdded(next, prev) || wasChanged(next, prev)) && next === true) {
    domNode.setAttribute(key, "");
  }
}

function updateValueAttribute(
  domNode: HTMLInputElement,
  next?: string,
  prev?: string
) {
  if (wasAdded(next, prev) || wasChanged(next, prev)) {
    domNode.value = next!;
  }
}

function updateStringAttribute(
  domNode: Element,
  key: string,
  next?: string,
  prev?: string
): void {
  if (wasRemoved(next, prev)) {
    domNode.removeAttribute(key);
  }

  if (wasAdded(next, prev) || wasChanged(next, prev)) {
    domNode.setAttribute(key, next!);
  }
}

function updateAttribute(
  domNode: Element,
  key: string,
  next?: any,
  prev?: any
): void {
  if (key === "value") {
    updateValueAttribute(domNode as HTMLInputElement, next, prev);
  } else if (key === "style") {
    updateStyleAttribute(domNode as HTMLElement, next, prev);
  } else if (key.slice(0, 2) === "on") {
    updateEventAttribute(domNode, key, next, prev);
  } else if (booleanAttributesSet.has(key)) {
    updateBooleanAttribute(domNode, key, next, prev);
  } else {
    updateStringAttribute(domNode, key, next, prev);
  }
}

function updateAttributes(
  domNode: Element,
  next: Record<string, any>,
  prev: Record<string, any> = emptyObject
): void {
  const attributes = distinctKeys(next, prev);

  attributes.forEach((key) => {
    updateAttribute(domNode, key, next[key], prev[key]);
  });
}

export function isElementVDom(vdom: VDOMChild): vdom is VDOMElement<string> {
  return typeof vdom === "object" && typeof vdom.type === "string";
}

export function isElementInstance(
  instance: ChildInstance
): instance is ElementInstance {
  return instance.type === ELEMENT;
}

export function createElement(
  parent: ParentInstance,
  vdom: VDOMElement<string>
): ElementInstance {
  const { type } = vdom;

  const element = ({
    type: ELEMENT,
    domNode: document.createElement(type),
    vdom,
    parent,
  } as unknown) as ElementInstance;

  element.children = createChildren(element);

  return element;
}

export function mountElement(
  element: ElementInstance,
  insertBefore?: Node
): void {
  const { vdom } = element;
  const { props, children: vdomChildren } = vdom;
  const { domNode, children } = element;

  updateAttributes(domNode, props);

  insertDomNode(getParentDomNode(element), domNode, insertBefore);

  mountChildren(children, sanitizeVDOMChildren(vdomChildren));
}

export function updateElement(
  element: ElementInstance,
  nextVDom: VDOMElement<string>
): void {
  const { vdom: prevVDom, parent, domNode, children } = element;
  const { type: prevType, props: prevProps } = prevVDom;
  const { type: nextType, props: nextProps, children: vdomChildren } = nextVDom;

  if (nextType !== prevType) {
    replaceChild(element, createElement(parent, nextVDom));
    return;
  }

  updateAttributes(domNode, nextProps, prevProps);

  element.vdom = nextVDom;

  updateChildren(children, sanitizeVDOMChildren(vdomChildren));
}

export function prepareToUnmountElement(element: ElementInstance) {
  const { children } = element;

  prepareToUnmountChildren(children);
}

export function unmountElement(element: ElementInstance): void {
  const { domNode } = element;

  removeDomNode(getParentDomNode(element), domNode);
}
