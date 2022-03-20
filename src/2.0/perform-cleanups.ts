import { isConsumeContext, isUseEffect } from "./hooks";
import { Component } from "./types";

export const performCleanups = (component: Component) => {
  for (const hook of component.hooks) {
    if (isUseEffect(hook)) {
      hook.pendingCleanup?.();
      hook.pendingCleanup = undefined;
    } else if (isConsumeContext(hook)) {
      if (typeof hook.provider !== "undefined") {
        hook.provider.consumers.splice(
          hook.provider.consumers.indexOf(component)
        );
        hook.provider = undefined;
      }
    }
  }
};
