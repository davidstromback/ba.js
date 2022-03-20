import { VDOMChild, VDOMElement } from "../vdom";
import {
  safelyMountChild,
  safelyPrepareToUnmountChild,
  safelyUnmountChild,
  safelyUpdateChild,
} from "./child";
import { createRef, Ref } from "./ref";
import {
  ChildInstance,
  ParentInstance,
  CONTEXT,
  ContextInstance,
} from "./types";

export interface MemoProps {
  child: VDOMChild;
}

export function isContextVDom(vdom: VDOMChild): vdom is ContextElement {
  return typeof vdom === "object" && vdom.type === CONTEXT;
}

export function isContextInstance(
  instance: ChildInstance | ParentInstance
): instance is ContextInstance {
  return instance.type === CONTEXT;
}

export const context = <T>(defaultValue: T) => {
  const ref = createRef(defaultValue);
  const provider = (value: T, child: VDOMChild): ContextElement => {
    return {
      type: CONTEXT,
      props: {
        ref,
        value,
        child,
      },
    };
  };

  provider.ref = ref;

  return provider;
};

export function createContext(
  parent: ParentInstance,
  vdom: ContextElement
): ContextInstance {
  return {
    type: CONTEXT,
    vdom,
    parent,
  };
}

export function mountContext(
  instance: ContextInstance,
  insertBefore?: Node
): void {
  safelyMountChild(instance, instance.vdom.props.child, insertBefore);
}

export function updateContext(
  instance: ContextInstance,
  nextVDom: ContextElement
): void {
  instance.vdom = nextVDom;

  safelyUpdateChild(instance, instance.vdom.props.child);
}

export function prepareToUnmountContext(instance: ContextInstance): void {
  safelyPrepareToUnmountChild(instance.child);
}

export function unmountContext(instance: ContextInstance): void {
  safelyUnmountChild(instance.child);
}
