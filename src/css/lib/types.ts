import type { PrimitiveElement } from "../../vdom";
import type { Visitor } from "./util/visit";

export declare namespace CSS {
  export type Value = string | number | (string | number)[];

  export interface Literal {
    [key: string]: Literal | Value | boolean | null | undefined | void;
  }

  export interface Root {
    type: "root";
    value: Literal;
    declarations: [string, Value][];
    children: Child[];
  }

  export interface Child {
    type: "declarationBlock" | "nestedAtRule";
    value: Literal;
    declarations: [string, Value][];
    children: Child[];
    parent: Node;
    selector: string;
  }

  export type Node = Root | Child;

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
    <T extends PrimitiveElement<any>>(element: T, style: Literal): T;
  }
}

export type Value = CSS.Value;
export type Literal = CSS.Literal;
export type Root = CSS.Root;
export type Child = CSS.Child;
export type Node = CSS.Node;
export type Options = CSS.Options;
export type CSS = CSS.CSS;
export type Global = CSS.Global;
export type Styled = CSS.Styled;
