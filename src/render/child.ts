import type { ComponentFn, VDOMChild, VDOMElement, VDOMNode } from "../vdom";
import type { ParentInstance, ChildInstance, ChildInstanceType } from "./types";

import { COMPONENT, ELEMENT, NODE } from "./types";
import {
  isNodeVDom,
  createNode,
  mountNode,
  unmountNode,
  updateNode,
} from "./node";
import {
  isElementVDom,
  createElement,
  mountElement,
  unmountElement,
  updateElement,
  prepareToUnmountElement,
} from "./element";
import {
  isComponentVDom,
  isComponentInstance,
  createComponent,
  mountComponent,
  unmountComponent,
  updateComponent,
  getComponentDomNode,
  prepareToUnmountComponent,
} from "./component";

export function insertDomNode(
  parent: Node,
  domNode: Node,
  insertBefore?: Node
): void {
  if (insertBefore) {
    parent.insertBefore(domNode, insertBefore);
  } else {
    parent.appendChild(domNode);
  }
}

export function removeDomNode(parent: Node, domNode: Node): void {
  parent.removeChild(domNode);
}

export function getParentDomNode(child: ChildInstance): Element {
  let { parent } = child;

  while (isComponentInstance(parent)) {
    parent = parent.parent;
  }

  return parent.domNode;
}

export function getChildDomNode(
  instance: ChildInstance
): Element | Node | undefined {
  if (isComponentInstance(instance)) {
    return getComponentDomNode(instance);
  }

  return instance.domNode;
}

export function getNextSiblingDomNode(
  instance: ChildInstance
): Node | Element | undefined {
  const { parent, nextSibling } = instance;

  if (!nextSibling) {
    if (isComponentInstance(parent)) {
      return getNextSiblingDomNode(parent);
    }

    return undefined;
  }

  if (isComponentInstance(nextSibling)) {
    return (
      getComponentDomNode(nextSibling) ?? getNextSiblingDomNode(nextSibling)
    );
  }

  return nextSibling.domNode;
}

export function getVDomChildType(vdom: VDOMChild): ChildInstanceType {
  if (isNodeVDom(vdom)) {
    return NODE;
  }

  if (isElementVDom(vdom)) {
    return ELEMENT;
  }

  if (isComponentVDom(vdom)) {
    return COMPONENT;
  }

  throw new TypeError(`Invalid component ${String(vdom)}`);
}

export function createChild(
  parent: ParentInstance,
  vdom: VDOMChild
): ChildInstance {
  if (isNodeVDom(vdom)) {
    return createNode(parent, vdom);
  }

  if (isElementVDom(vdom)) {
    return createElement(parent, vdom);
  }

  if (isComponentVDom(vdom)) {
    return createComponent(parent, vdom);
  }

  throw new TypeError(`Invalid component type ${String((vdom as any).type)}`);
}

export function mountChild(instance: ChildInstance, insertBefore?: Node): void {
  switch (instance.type) {
    case NODE:
      mountNode(instance, insertBefore);
      return;
    case ELEMENT:
      mountElement(instance, insertBefore);
      return;
    case COMPONENT:
      mountComponent(instance, insertBefore);
      return;
  }
}

export function updateChild(instance: ChildInstance, vdom: VDOMChild): void {
  if (instance.type !== getVDomChildType(vdom)) {
    replaceChild(instance, createChild(instance.parent, vdom));
    return;
  }

  switch (instance.type) {
    case NODE:
      updateNode(instance, vdom as VDOMNode);
      return;
    case ELEMENT:
      updateElement(instance, vdom as VDOMElement<string, Record<string, any>>);
      return;
    case COMPONENT:
      updateComponent(instance, vdom as VDOMElement<ComponentFn>);
      return;
  }
}

export function prepareToUnmountChild(child: ChildInstance) {
  switch (child.type) {
    case ELEMENT:
      prepareToUnmountElement(child);
      return;
    case COMPONENT:
      prepareToUnmountComponent(child);
      return;
  }
}

export function unmountChild(instance: ChildInstance): void {
  switch (instance.type) {
    case NODE:
      unmountNode(instance);
      return;
    case ELEMENT:
      unmountElement(instance);
      return;
    case COMPONENT:
      unmountComponent(instance);
      return;
  }
}

export const replaceChild: (
  childToBeReplaced: ChildInstance,
  childToReplaceWith: ChildInstance
) => void = (a: any, b: any) => {
  prepareToUnmountChild(a);
  unmountChild(a);

  delete a.type;
  delete a.vdom;
  delete a.domNode;
  delete a.mounted;
  delete a.unmounting;
  delete a.dispatch;
  delete a.children;
  delete a.child;
  delete a.pendingEffects;
  delete a.pendingCleanups;

  delete b.prevSibling;
  delete b.nextSibling;

  Object.assign(a, b);

  mountChild(a, getNextSiblingDomNode(a));
};
