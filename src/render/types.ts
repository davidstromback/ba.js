import { ComponentFn, VDOMElement, VDOMNode } from "../vdom";

export type RootType = 0;
export type NodeType = 1;
export type ElementType = 2;
export type ComponentType = 3;

export const ROOT: RootType = 0;
export const NODE: NodeType = 1;
export const ELEMENT: ElementType = 2;
export const COMPONENT: ComponentType = 3;

export type Children = {
  parent: ElementInstance;
  byKey: Map<string | number, ChildInstance>;
  keys: (number | string)[];
};

export interface RootInstance {
  type: RootType;
  domNode: Element;
}

export interface NodeInstance {
  type: NodeType;
  vdom: VDOMNode;
  domNode: Node;
  nextSibling?: ChildInstance;
  prevSibling?: ChildInstance;
  parent: ParentInstance;
}

export interface ElementInstance {
  type: ElementType;
  children: Children;
  vdom: VDOMElement<string>;
  domNode: Element;
  nextSibling?: ChildInstance;
  prevSibling?: ChildInstance;
  parent: ParentInstance;
}

export interface ComponentInstance {
  type: ComponentType;
  child?: ChildInstance;
  vdom: VDOMElement<ComponentFn>;
  mounted: boolean;
  unmounting: boolean;
  hooks: Record<number, any>;
  pendingEffects: Record<string, () => void | (() => void)>;
  pendingCleanups: Record<string, () => void>;
  dispatch: () => void;
  nextSibling?: ChildInstance;
  prevSibling?: ChildInstance;
  parent: ParentInstance;
}

export type ParentInstance = RootInstance | ElementInstance | ComponentInstance;
export type ChildInstance = ElementInstance | NodeInstance | ComponentInstance;
export type Instance = ParentInstance | ChildInstance;
export type ParentInstanceType = ParentInstance["type"];
export type ChildInstanceType = ChildInstance["type"];
export type InstanceType = ParentInstanceType | ChildInstanceType;
