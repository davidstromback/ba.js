import type { Child, VDOM } from "./types";

import { assert } from "./util/assert";
import { isVDOMNode } from "./vdom";

const { hasOwnProperty } = Object.prototype;

/**
 * Creates a map of children by key. Children without explicit
 * keys will recieve an index-based implicit key instead.
 */
function createMap<T>(
  getKey: (child: T) => number | string | undefined,
  children: Array<T>
) {
  let nextImplicitKey = 0;

  const result: Record<string, T> = {};

  for (const child of children) {
    let key = getKey(child);

    if (key != null) {
      key = `k-${key}`;
    } else {
      key = `i-${nextImplicitKey++}`;
    }

    assert(
      !hasOwnProperty.call(result, key),
      `keys must be unique, found duplicate key ${key}`
    );

    result[key] = child;
  }

  return result;
}

function getVDOMKey(vdom: VDOM) {
  if (isVDOMNode(vdom)) {
    return vdom.key;
  }

  return undefined;
}

export function mapVDOMChildren(vdom: VDOM[]) {
  return createMap(getVDOMKey, vdom);
}

function getKey({ vdom }: Child) {
  return getVDOMKey(vdom);
}

export function mapChildren(children: Child[]) {
  return createMap(getKey, children);
}
