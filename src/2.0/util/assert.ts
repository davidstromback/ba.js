export function assert(
  value: unknown,
  message: string | ((value: unknown) => string)
): asserts value {
  if (!value) {
    throw new Error(typeof message === "string" ? message : message(value));
  }
}
