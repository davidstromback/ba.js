import type { ComponentFn, VDOMChild, VDOMElement } from "../vdom";
import type { ParentInstance, ComponentInstance, ChildInstance } from "./types";

import { COMPONENT } from "./types";
import { renderWithHooks } from "./hooks";
import {
  mountChild,
  unmountChild,
  updateChild,
  createChild,
  replaceChild,
  getChildDomNode,
  prepareToUnmountChild,
} from "./child";
import { isValidChild } from "./children";

function mountComponentChild(
  instance: ComponentInstance,
  vdom?: VDOMChild | false | null,
  insertBefore?: Node
): ChildInstance | undefined {
  if (isValidChild(vdom)) {
    const child = createChild(instance, vdom);
    mountChild(child, insertBefore);
    return child;
  }

  return undefined;
}

function updateComponentChild(
  instance: ComponentInstance,
  vdom?: VDOMChild | false | null
): ChildInstance | undefined {
  const { child } = instance;

  if (!child) {
    return mountComponentChild(instance, vdom);
  }

  if (isValidChild(vdom)) {
    updateChild(child, vdom);
    return child;
  }

  prepareToUnmountChild(child);

  unmountChild(child);
  return undefined;
}

export function isComponentVDom(
  vdom: VDOMChild
): vdom is VDOMElement<ComponentFn> {
  return typeof vdom === "object" && typeof vdom.type === "function";
}

export function isComponentInstance(
  instance: ChildInstance | ParentInstance
): instance is ComponentInstance {
  return instance.type === COMPONENT;
}

export function getComponentDomNode(
  instance: ComponentInstance
): Element | Node | undefined {
  const { child } = instance;

  if (child) {
    return getChildDomNode(child);
  }

  return undefined;
}

function dispatch(this: ComponentInstance) {
  const { mounted } = this;

  if (!mounted) {
    throw new Error("call to setState on mounting or unmounted component :(");
  }

  this.child = updateComponentChild(this, renderWithHooks(this));
}

export function performEffects(instance: ComponentInstance) {
  const { pendingEffects, pendingCleanups } = instance;

  for (const [index, effect] of Object.entries(pendingEffects)) {
    const pendingCleanup = pendingCleanups[index];

    if (pendingCleanup) {
      pendingCleanup();
      delete pendingCleanups[index];
    }

    const cleanup = effect();

    if (cleanup) {
      pendingCleanups[index] = cleanup;
    }

    delete pendingEffects[index];
  }
}

export function createComponent(
  parent: ParentInstance,
  vdom: VDOMElement<ComponentFn>
): ComponentInstance {
  return {
    type: COMPONENT,
    mounted: false,
    unmounting: false,
    pendingEffects: {},
    pendingCleanups: {},
    hooks: {},
    vdom,
    parent,
    dispatch,
  };
}

export function mountComponent(
  instance: ComponentInstance,
  insertBefore?: Node
): void {
  instance.dispatch = dispatch.bind(instance);

  instance.child = mountComponentChild(
    instance,
    renderWithHooks(instance),
    insertBefore
  );

  instance.mounted = true;

  performEffects(instance);
}

export function updateComponent(
  instance: ComponentInstance,
  nextVDom: VDOMElement<ComponentFn>
): void {
  const { vdom: prevVDom, parent } = instance;
  const { type: prevType } = prevVDom;
  const { type: nextType } = nextVDom;

  if (nextType !== prevType) {
    replaceChild(instance, createComponent(parent, nextVDom));
    return;
  }

  instance.vdom = nextVDom;
  instance.child = updateComponentChild(instance, renderWithHooks(instance));

  performEffects(instance);
}

export function prepareToUnmountComponent(instance: ComponentInstance): void {
  const { pendingCleanups, child } = instance;

  instance.unmounting = true;

  for (const cleanup of Object.values(pendingCleanups)) {
    cleanup();
  }

  if (child) {
    prepareToUnmountChild(child);
  }
}

export function unmountComponent(instance: ComponentInstance): void {
  const { child } = instance;

  instance.mounted = false;

  if (child) {
    unmountChild(child);
  }
}
