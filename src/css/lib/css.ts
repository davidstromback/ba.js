import type { Instance } from "./factory";
import type { CSS } from "./types";

import { hash } from "./util/hash";
import { process } from "./ast/process";

export const css: CSS = function (this: Instance, css) {
  const cssString = process({ [this.options.prefix]: css }, this.transformers);
  const className = this.options.prefix + "-" + hash(cssString);

  this.manager.enter(
    className,
    this.manager.has(className)
      ? undefined
      : process({ ["." + className]: css }, this.transformers)
  );

  return className;
};
