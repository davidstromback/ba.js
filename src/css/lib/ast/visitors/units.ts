import type { Node, Value } from "../../types";
import type { Visitor } from "../../util/visit";

const angle = ["rotate", "offset-rotate"];

const time = [
  "animation",
  "animation-duration",
  "animation-delay",
  "transition",
  "transition-duration",
  "transition-delay",
];

const length = [
  "background-position",
  "background-position-x",
  "background-position-y",
  "background-size",
  "block-size",
  "border",
  "border-block-end-width",
  "border-block-start-width",
  "border-block-width",
  "border-bottom-left-radius",
  "border-bottom-right-radius",
  "border-bottom-width",
  "border-end-end-radius",
  "border-end-start-radius",
  "border-inline-end-width",
  "border-inline-start-width",
  "border-inline-width",
  "border-left-width",
  "border-radius",
  "border-right-width",
  "border-start-end-radius",
  "border-start-start-radius",
  "border-top-left-radius",
  "border-top-right-radius",
  "border-top-width",
  "border-width",
  "bottom",
  "column-gap",
  "column-rule-width",
  "column-width",
  "flex-basis",
  "font-size",
  "gap",
  "grid-template-columns",
  "grid-template-rows",
  "height",
  "inline-size",
  "inset",
  "inset-block",
  "inset-block-end",
  "inset-block-start",
  "inset-inline",
  "inset-inline-end",
  "inset-inline-start",
  "left",
  "margin",
  "margin-block",
  "margin-block-end",
  "margin-block-start",
  "margin-bottom",
  "margin-inline",
  "margin-inline-end",
  "margin-inline-start",
  "margin-left",
  "margin-right",
  "margin-top",
  "mask-border-width",
  "mask-origin",
  "mask-position",
  "mask-size",
  "max-block-size",
  "max-height",
  "max-width",
  "min-block-size",
  "min-height",
  "min-width",
  "offset",
  "offset-anchor",
  "offset-distance",
  "offset-position",
  "outline-width",
  "overflow-clip-margin",
  "padding",
  "padding-block",
  "padding-block-end",
  "padding-block-start",
  "padding-bottom",
  "padding-inline",
  "padding-inline-end",
  "padding-inline-start",
  "padding-left",
  "padding-right",
  "padding-top",
  "perspective",
  "right",
  "row-gap",
  "scroll-margin",
  "scroll-margin-block",
  "scroll-margin-block-end",
  "scroll-margin-block-start",
  "scroll-margin-bottom",
  "scroll-margin-inline",
  "scroll-margin-inline-end",
  "scroll-margin-inline-start",
  "scroll-margin-left",
  "scroll-margin-right",
  "scroll-margin-top",
  "scroll-padding",
  "scroll-padding-block",
  "scroll-padding-block-end",
  "scroll-padding-block-start",
  "scroll-padding-bottom",
  "scroll-padding-inline",
  "scroll-padding-inline-end",
  "scroll-padding-inline-start",
  "scroll-padding-left",
  "scroll-padding-right",
  "scroll-padding-top",
  "top",
  "translate",
  "width",
];

const entries = (keys: string[], value: string) => {
  return Object.fromEntries(keys.map((key) => [key, value]));
};

const defaults: Record<string, string> = {
  ...entries(angle, "deg"),
  ...entries(time, "ms"),
  ...entries(length, "px"),
};

const { hasOwnProperty } = Object.prototype;

const appendValue = (value: string | number, unit: string) => {
  return typeof value === "number" ? value.toString() + unit : value;
};

const appendDeclaration = (declaration: [string, Value]) => {
  const [key, value] = declaration;
  if (hasOwnProperty.call(defaults, key)) {
    if (Array.isArray(value)) {
      const next: string[] = [];
      for (const part of value) {
        next.push(appendValue(part, defaults[key]));
      }
      declaration[1] = next;
    } else {
      declaration[1] = appendValue(value, defaults[key]);
    }
  }
};

export const units: Visitor<Node> = (node) => {
  node.declarations.forEach(appendDeclaration);
};
