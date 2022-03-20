import type { Instance } from "./factory";
import type { Global } from "./types";

import { process } from "./ast/process";
import { hash } from "./util/hash";

export const global: Global = function (this: Instance, css) {
  const cssString = process(css);
  const key = this.options.prefix + "global" + hash(cssString);
  this.manager.enter(key, cssString);
};
