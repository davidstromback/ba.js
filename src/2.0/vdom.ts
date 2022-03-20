import {
  VDOMChildren,
  VDOM,
  ElementAttributes,
  FunctionComponent,
  VDOMNode,
  VDOMText,
  VDOMVoid,
  PropsWithKey,
  VDOMElement,
  VDOMComponent,
  VDOMFragment,
  Children,
} from "./types";

import { isRecord } from "./util/is-record";
import { COMPONENT, ELEMENT, FRAGMENT, TEXT } from "./util/type-guards";

export const isVDOMText = (node: unknown): node is VDOMText => {
  return typeof node === "string" || typeof node === "number";
};

export const isVDOMNode = (node: unknown): node is VDOMNode => isRecord(node);

export const isVDOMElement = (node: unknown): node is VDOMElement => {
  return isRecord(node) && typeof node.type === "string";
};

export const isVDOMComponent = (node: unknown): node is VDOMComponent => {
  return isRecord(node) && typeof node.type === "function";
};

export const isVDOMFragment = (node: unknown): node is VDOMFragment => {
  return isRecord(node) && node.type === FRAGMENT;
};

export const getVDomType = (node: unknown) => {
  if (isVDOMText(node)) return TEXT;
  if (isVDOMFragment(node)) return FRAGMENT;
  if (isVDOMElement(node)) return ELEMENT;
  if (isVDOMComponent(node)) return COMPONENT;

  throw new Error("invalid vdom");
};

const isValid = (value: unknown) => {
  return (
    isVDOMText(value) ||
    isVDOMFragment(value) ||
    isVDOMElement(value) ||
    isVDOMComponent(value)
  );
};

export const sanitize = (value: VDOMChildren, clean: Array<VDOM> = []) => {
  if (Array.isArray(value)) {
    for (const candidate of value) {
      sanitize(candidate, clean);
    }
  } else if (
    isVDOMText(value) ||
    isVDOMFragment(value) ||
    isVDOMElement(value) ||
    isVDOMComponent(value)
  ) {
    clean.push(value);
  }

  return clean;
};

export const fragment = (
  keyOrChildren?: number | string | Array<VDOM>,
  children?: Array<VDOM>
): VDOMFragment => {
  if (typeof keyOrChildren === "string" || typeof keyOrChildren === "number") {
    return {
      type: FRAGMENT,
      key: String(keyOrChildren),
      children: children ?? [],
    };
  }

  return { type: FRAGMENT, children: keyOrChildren ?? [] };
};

export const createNode = (
  type: any,
  props: PropsWithKey<Record<string, unknown>> = {},
  children?: any
): VDOMNode => {
  const { key } = props;

  delete props.key;

  if (typeof props.children === "undefined") {
    props.children = children;
  }

  return { key, type, props };
};

type ComponentFactory<P extends Record<string, unknown>> = {
  (props: PropsWithKey<P>): VDOMNode;
} & ({} extends P ? { (): VDOMNode } : {}) &
  (Children<P> extends never
    ? {}
    : {
        (
          props: Omit<PropsWithKey<P>, "children">,
          children: Children<P>
        ): VDOMNode;
      });

interface ElementFactory<T extends string> {
  (children?: VDOMText | VDOMVoid | Array<VDOMChildren>): VDOMNode;
  (
    props?: PropsWithKey<ElementAttributes<T>>,
    children?: VDOMChildren
  ): VDOMNode;
}

export const createFactory: {
  <P extends Record<string, any>>(
    type: FunctionComponent<P>
  ): ComponentFactory<P>;
  <T extends string>(type: T): ElementFactory<T>;
} = (type: string | FunctionComponent) => {
  switch (typeof type) {
    case "string":
      return (propsOrChildren?: any, children?: any) => {
        if (isRecord(propsOrChildren)) {
          return createNode(type, propsOrChildren, children);
        }

        return createNode(type, undefined, propsOrChildren);
      };
    case "function":
      return (props?: any, children?: unknown) => {
        return createNode(type, props, children);
      };
  }
};
