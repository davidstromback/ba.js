import { renderWithHooks } from "./hooks";
import {
  Text,
  Element,
  VDOMText,
  Parent,
  VDOMFragment,
  Fragment,
  VDOMElement,
  VDOMComponent,
  Component,
  VDOM,
} from "./types";
import { TEXT, FRAGMENT, ELEMENT, COMPONENT } from "./util/type-guards";
import {
  sanitize,
  isVDOMText,
  isVDOMFragment,
  isVDOMElement,
  isVDOMComponent,
} from "./vdom";

const createText = (vdom: VDOMText, parent: Parent, index: number): Text => ({
  type: TEXT,
  index,
  parent,
  dom: document.createTextNode(String(vdom)),
  vdom,
  mounted: false,
  needsUpdate: true,
  needsCommit: true,
  pendingVDom: undefined,
});

const createFragment = (
  vdom: VDOMFragment,
  parent: Parent,
  index: number
): Fragment => ({
  type: FRAGMENT,
  index,
  parent,
  children: [],
  mounted: false,
  needsUpdate: true,
  needsCommit: true,
  vdom,
  pendingVDom: undefined,
  pendingChildren: sanitize(vdom.children),
});

const createElement = (
  vdom: VDOMElement,
  parent: Parent,
  index: number
): Element => ({
  type: ELEMENT,
  index,
  parent,
  dom: document.createElement(vdom.type),
  children: [],
  mounted: false,
  needsUpdate: true,
  needsCommit: true,
  vdom,
  pendingVDom: undefined,
  pendingChildren: sanitize(vdom.props.children),
});

const createComponent = (
  vdom: VDOMComponent,
  parent: Parent,
  index: number
): Component => {
  const component: Component = {
    type: COMPONENT,
    index,
    parent,
    children: [],
    hooks: [],
    vdom,
    mounted: false,
    needsUpdate: true,
    needsCommit: true,
    unmounting: false,
    pendingVDom: undefined,
    pendingChildren: undefined,
  };

  component.pendingChildren = sanitize(
    renderWithHooks(component, vdom.props, true)
  );

  return component;
};

export function createChild(vdom: VDOM, parent: Parent, index: number) {
  if (isVDOMText(vdom)) return createText(vdom, parent, index);
  if (isVDOMFragment(vdom)) return createFragment(vdom, parent, index);
  if (isVDOMElement(vdom)) return createElement(vdom, parent, index);
  if (isVDOMComponent(vdom)) return createComponent(vdom, parent, index);

  throw new Error("invalid vdom");
}
