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
  Instance,
  ParentInstance,
  CONTEXT,
  ContextInstance,
  ContextType,
  ROOT,
} from "./types";

export interface ContextProps<T = any> {
  value: T;
  ref: Ref<T>;
  child: VDOMChild;
}

export function isContextVDom(vdom: VDOMElement): vdom is VDOMElement<ContextType, ContextProps> {
  return vdom.type === CONTEXT;
}

export function isContextInstance(
  instance: ChildInstance | ParentInstance
): instance is ContextInstance {
  return instance.type === CONTEXT;
}

export const getContext = <T>(ref: Ref<T>, node: Instance) => {
    while (node.type !== ROOT) {
      if (node.type === CONTEXT && node.vdom.props.ref === ref) {
        return node;
      }
  
      node = node.parent;
    }
  
    return undefined;
  };
  
export const getContextValue = <T>(ref: Ref<T>, node: Instance): T => {
  while (node.type !== ROOT) {
    if (node.type === CONTEXT && node.vdom.props.ref === ref) {
      return node.vdom.props.value;
    }

    node = node.parent;
  }

  return ref.current;
};


export const context = <T>(defaultValue: T) => {
  const ref = createRef(defaultValue);
  const provider = (value: T, child: VDOMChild): VDOMElement<ContextType, ContextProps<T>> => {
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
  vdom: VDOMElement<ContextType, ContextProps>
): ContextInstance {
  return {
    type: CONTEXT,
    vdom,
    parent,
    subscribers: []
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
  nextVDom: VDOMElement<ContextType, ContextProps>
): void {
  instance.vdom = nextVDom;
  instance.shouldUpdate = new Set(instance.subscribers)

  safelyUpdateChild(instance, instance.vdom.props.child);

  instance.shouldUpdate.forEach(ref => ref.current.dispatch())
  instance.shouldUpdate = undefined;
}

export function prepareToUnmountContext(instance: ContextInstance): void {
  safelyPrepareToUnmountChild(instance.child);
}

export function unmountContext(instance: ContextInstance): void {
  safelyUnmountChild(instance.child);
}
