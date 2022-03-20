import { DOMElement } from "./types";
import { assert } from "./util/assert";
import { camelToDash } from "./util/camel-to-dash";
import { isRecord } from "./util/is-record";
import { typeString } from "./util/type-string";

const empty: Record<string, unknown> = {};

const updateValue = (element: DOMElement, next: unknown, prev: unknown) => {
  if (element instanceof HTMLInputElement && !Object.is(next, prev)) {
    if (typeof next === "undefined") {
      element.value = "";
    } else {
      element.value = String(next);
    }
  }
};

const uniqueKeys = (a: Record<string, unknown>, b: Record<string, unknown>) => {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  for (const key of bKeys) {
    if (!hasOwnProperty.call(a, key)) {
      aKeys.push(key);
    }
  }

  return aKeys;
};

const updateStyleProperty = (
  element: HTMLElement,
  key: string,
  next: unknown,
  prev: unknown
) => {
  if (!Object.is(next, prev)) {
    if (typeof next === "undefined") {
      element.style.removeProperty(key);
    } else {
      element.style.setProperty(key, String(next));
    }
  }
};

const updateStyle = (
  element: DOMElement,
  next: unknown = empty,
  prev: unknown = empty
) => {
  assert(
    element instanceof HTMLElement,
    `"style" is not a valid attribute for ${element.tagName}`
  );

  assert(
    isRecord(next),
    `invalid "style" value. expected an object, instead recieved ${typeString(
      next
    )}`
  );

  const keys = uniqueKeys(next, prev as Record<string, unknown>);

  for (const key of keys) {
    updateStyleProperty(
      element,
      camelToDash(key),
      next[key],
      (prev as Record<string, unknown>)[key]
    );
  }
};

const updateEventListener = (
  element: DOMElement,
  key: string,
  next: unknown,
  prev: unknown
) => {
  const type = key.slice(2).toLowerCase();

  if (!Object.is(next, prev)) {
    if (typeof prev !== "undefined") {
      element.removeEventListener(type, prev as EventListener);
    }

    if (typeof next !== "undefined") {
      element.addEventListener(type, next as EventListener);
    }
  }
};

const updateOther = (
  element: DOMElement,
  key: string,
  next: unknown,
  prev: unknown
) => {
  if (!Object.is(next, prev)) {
    if (typeof next === "undefined" || next === false) {
      element.removeAttribute(key);
    } else {
      element.setAttribute(key, next === true ? "" : String(next));
    }
  }
};

const updateAttribute = (
  element: DOMElement,
  key: string,
  next: unknown,
  prev: unknown
) => {
  if (key === "children") return;

  if (key === "value") {
    updateValue(element, next, prev);
  } else if (key === "style") {
    updateStyle(element, next, prev);
  } else if (key.startsWith("on")) {
    updateEventListener(element, key, next, prev);
  } else {
    updateOther(element, key, next, prev);
  }
};

export const reconcileAttributes = (
  element: DOMElement,
  next: Record<string, unknown>,
  prev = empty
) => {
  const keys = uniqueKeys(prev, next);

  for (const key of keys) {
    updateAttribute(element, key, next[key], prev[key]);
  }
};

export const setAttributes = (
  element: DOMElement,
  attributes: Record<string, any>
) => {
  for (const key of Object.keys(attributes)) {
    updateAttribute(element, key, attributes[key], undefined);
  }
};
