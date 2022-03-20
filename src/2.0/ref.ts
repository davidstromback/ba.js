import type { Ref } from "./types";

import { assert } from "./util/assert";
import { isRecord } from "./util/is-record";
import { typeString } from "./util/type-string";

export const createRef: {
  <T>(): Ref<T | undefined>;
  <T>(value: T): Ref<T>;
} = <T>(value?: T): Ref<T | undefined> => ({ value });

export const safelyUpdateRef = (ref: unknown, value: unknown) => {
  assert(
    isRecord(ref),
    `invalid ref. expected an object, instead recieved ${typeString(value)}`
  );

  ref.value = value;
};

export const safelyUpdateOptionalRef = (ref: unknown, value: unknown) => {
  if (typeof ref !== 'undefined') {
    safelyUpdateRef(ref, value);
  }
};
