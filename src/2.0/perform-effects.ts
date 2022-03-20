import { isUseEffect } from "./hooks";
import { Component, Hook } from "./types";

function performEffect(hook: Hook) {
  if (isUseEffect(hook) && typeof hook.pendingEffect === "function") {
    hook.pendingCleanup?.();
    hook.pendingCleanup = hook.pendingEffect() ?? undefined;
    hook.pendingEffect = undefined;
  }
}

function performEffectsOnComponent(component: Component) {
  component.hooks.forEach(performEffect);
}

export function performEffects(needsEffects: Array<Component>) {
  needsEffects.forEach(performEffectsOnComponent);
}
