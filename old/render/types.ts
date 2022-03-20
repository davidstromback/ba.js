import { ComponentFn, ElementAttributes, VDOMElement, VDOMText } from "../vdom";
import { ContextProps } from "./context";
import { MemoProps } from "./memo";
import { Ref } from "./ref";

export type RootType = 0;
export type NodeType = 1;
export type ElementType = 2;
export type ComponentType = 3;
export type ContextType = 4;
export type MemoType = 5;

export const ROOT: RootType = 0;
export const NODE: NodeType = 1;
export const ELEMENT: ElementType = 2;
export const COMPONENT: ComponentType = 3;
export const CONTEXT: ContextType = 4;
export const MEMO: MemoType = 5;

export type Children = {
  parent: ElementInstance;
  byKey: Record<string | number, ChildInstance>;
  keys: (number | string)[];
};

export interface RootInstance {
    ref: {};
  type: RootType;
  domNode: Element;
}

export interface NodeInstance {
  type: NodeType;
  vdom: VDOMText;
  domNode: Node;
  nextSibling?: ChildInstance;
  prevSibling?: ChildInstance;
  parent: ParentInstance;
}

export interface ElementInstance {
  type: ElementType;
  children: Children;
  vdom: VDOMElement<string, ElementAttributes>;
  domNode: Element;
  nextSibling?: ChildInstance;
  prevSibling?: ChildInstance;
  parent: ParentInstance;
}

export interface ComponentInstance {
    ref: Ref<ComponentInstance>;
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

export interface ContextInstance {
  type: ContextType;
  vdom: VDOMElement<ContextType, ContextProps>;
  child?: ChildInstance;
  subscribers: Ref<ComponentInstance>[];
  shouldUpdate?: Set<Ref<ComponentInstance>>;
  nextSibling?: ChildInstance;
  prevSibling?: ChildInstance;
  parent: ParentInstance;
}

export interface MemoInstance {
  type: ContextType;
  vdom: VDOMElement<MemoType, MemoProps>;
  child?: ChildInstance;
  nextSibling?: ChildInstance;
  prevSibling?: ChildInstance;
  parent: ParentInstance;
}

export type ParentInstance =
  | RootInstance
  | ElementInstance
  | ComponentInstance
  | ContextInstance;

export type ChildInstance =
  | ElementInstance
  | NodeInstance
  | ComponentInstance
  | ContextInstance;

export type ParentInstanceType = ParentInstance["type"];

export type ChildInstanceType = ChildInstance["type"];

export type InstanceType = ParentInstanceType | ChildInstanceType;

export type Instance<T extends InstanceType = InstanceType> = Extract<
  ParentInstance | ChildInstance,
  { type: T }
>;
