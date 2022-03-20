import type { Visitor } from "./ast/util/visit";

import { DECLARATION_BLOCK, NESTED_AT_RULE, ROOT } from "./ast/node";

const css: Literal = { "@media (sfafaasf)": {} };

export declare namespace CSS {
  type PropertyName = {
    [K in keyof CSSStyleDeclaration]: K extends string
      ? CSSStyleDeclaration[K] extends string
        ? K
        : never
      : never;
  }[keyof CSSStyleDeclaration];

  type Properties<T> = {
    [K in PropertyName]?: T;
  };

  export type Value = string | number;

  export type Void = boolean | null | undefined | void;

  export type MaybeCallback<T, V> = ((props: T) => MaybeCallback<T, V>) | V;

  export interface Literal extends Properties<Value | Void> {
    [key: string]: Literal | Value | Void;
  }

  export interface CallbackLiteral<T = any>
    extends Properties<MaybeCallback<T, Value | Void>> {
    [key: string]: MaybeCallback<T, CallbackLiteral<T> | Value | Void>;
  }

  export interface Root<T = CallbackLiteral> {
    type: typeof ROOT;
    value: T;
    declarations: [string, Value][];
    children: Child<T>[];
    parent: undefined;
    selector: undefined;
  }

  export interface Child<T = CallbackLiteral> {
    type: typeof DECLARATION_BLOCK | typeof NESTED_AT_RULE;
    value: T;
    declarations: [string, Value][];
    children: Child<T>[];
    parent: Node<T>;
    selector: string;
  }

  export type Node<T = CallbackLiteral> = Root<T> | Child<T>;

  export interface CSS {
    (css: Literal): string;
  }

  export interface Options {
    prefix: string;
    element?: HTMLStyleElement;
    transformers?: Visitor<Node>[];
  }

  export interface Global {
    (css: Record<string, Literal>): void;
  }

  export interface Styled {
    <T extends (...args: any[]) => any>(element: T, style: Literal): T;
  }
}

export type Value = CSS.Value;
export type Literal = CSS.Literal;
export type Void = CSS.Void;
export type MaybeCallback<T, V> = CSS.MaybeCallback<T, V>;
export type CallbackLiteral<T = any> = CSS.CallbackLiteral<T>;
export type Root<T = CallbackLiteral> = CSS.Root<T>;
export type Child<T = CallbackLiteral> = CSS.Child<T>;
export type Node<T = CallbackLiteral> = CSS.Node<T>;
export type Options = CSS.Options;
export type CSS = CSS.CSS;
export type Global = CSS.Global;
export type Styled = CSS.Styled;
