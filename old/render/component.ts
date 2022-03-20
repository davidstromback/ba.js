import { ComponentFn, time, VDOMChild, VDOMElement } from "../vdom";
import type {
  ParentInstance,
  ComponentInstance,
  ChildInstance,
  Instance,
} from "./types";

import { COMPONENT } from "./types";
import { renderWithHooks } from "./hooks";
import {
  replaceChild,
  safelyUpdateChild,
  safelyMountChild,
  safelyUnmountChild,
  safelyPrepareToUnmountChild,
} from "./child";
import { createRef } from "./ref";

export function isComponentVDom(
  vdom: VDOMElement
): vdom is VDOMElement<ComponentFn> {
  return typeof vdom.type === "function";
}

export function isComponentInstance(
  instance: ChildInstance | ParentInstance
): instance is ComponentInstance {
  return instance.type === COMPONENT;
}

let currentUpdate: Set<Instance> | undefined;
let timeout: ReturnType<typeof setImmediate> | undefined;
let current: (() => void) | undefined;

const batchDispatch = (dispatch: () => void) => {
  if (typeof timeout !== "undefined") {
    clearImmediate(timeout);
    timeout = undefined;
    if (current && dispatch !== current) {
      current();
    }
  }

  current = dispatch;
  timeout = setImmediate(dispatch);
};

function dispatch(this: ComponentInstance) {
  const { mounted } = this;

  if (!mounted) {
    throw new Error("call to setState on mounting or unmounted component :(");
  }

  updateComponent(this);
}

export function createComponent(
  vdom: VDOMElement<ComponentFn>,
  parent: ParentInstance
): ComponentInstance {
  const i = {
    type: COMPONENT,
    mounted: false,
    unmounting: false,
    pendingEffects: {},
    pendingCleanups: {},
    hooks: {},
    vdom,
    parent,
    dispatch,
  } as ComponentInstance;

  i.ref = createRef(i);

  return i;
}

export function mountComponent(
  instance: ComponentInstance,
  insertBefore?: Node
): void {
  instance.dispatch = dispatch.bind(instance);

  safelyMountChild(instance, renderWithHooks(instance), insertBefore);

  instance.mounted = true;

  const { pendingEffects, pendingCleanups } = instance;

  for (const [index, effect] of Object.entries(pendingEffects)) {
    delete pendingEffects[index];

    const cleanup = effect();

    if (typeof cleanup === "function") {
      pendingCleanups[index] = cleanup;
    }
  }
}

export function updateComponent(
  instance: ComponentInstance,
  nextVDom?: VDOMElement<ComponentFn>
): void {
  const { vdom: prevVDom, parent } = instance;
  const { type: prevType } = prevVDom;

  if (typeof nextVDom !== "undefined") {
    const { type: nextType } = nextVDom;

    if (nextType !== prevType) {
      replaceChild(instance, createComponent(nextVDom, parent));
      return;
    }

    instance.vdom = nextVDom;
  }

  const childVDom = renderWithHooks(instance);
  const { pendingEffects, pendingCleanups } = instance;

  for (const [index] of Object.entries(pendingEffects)) {
    if (hasOwnProperty.call(pendingCleanups, index)) {
      const pendingCleanup = pendingCleanups[index];
      delete pendingCleanups[index];
      pendingCleanup();
    }
  }

  safelyUpdateChild(instance, childVDom);

  for (const [index, effect] of Object.entries(pendingEffects)) {
    delete pendingEffects[index];

    const cleanup = effect();

    if (typeof cleanup === "function") {
      pendingCleanups[index] = cleanup;
    }
  }
}

export function prepareToUnmountComponent(instance: ComponentInstance): void {
  const { pendingCleanups, child } = instance;

  instance.unmounting = true;

  for (const [index, cleanup] of Object.entries(pendingCleanups)) {
    delete pendingCleanups[index];
    cleanup();
  }

  safelyPrepareToUnmountChild(child);
}

export function unmountComponent(instance: ComponentInstance): void {
  const { child } = instance;

  instance.mounted = false;

  safelyUnmountChild(child);
}
