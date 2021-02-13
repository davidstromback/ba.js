import { createCss } from "./lib/factory";

export * from "./lib/types";

export { createCss } from "./lib/factory";

export const { css, global, styled } = createCss({ prefix: "css" });
