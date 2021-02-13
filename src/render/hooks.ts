import { ComponentInstance } from "./types";

function shallowCompareArray(a: any[], b: any[]) {
  return a.length === b.length && a.every((v, i) => Object.is(v, b[i]));
}

let currentHookIndex = 0;
let currentInstance: ComponentInstance | undefined;

export function renderWithHooks(component: ComponentInstance) {
  const { vdom } = component;
  const { type: renderFunc, props, children } = vdom;

  currentHookIndex = 0;
  currentInstance = component;

  const result = renderFunc({ ...props, children });

  currentHookIndex = 0;
  currentInstance = undefined;

  return result;
}

export function useEffect(effect: () => void | (() => void), deps: unknown[]) {
  const { hooks, pendingEffects } = currentInstance!;

  if (
    !hooks.hasOwnProperty(currentHookIndex) ||
    !shallowCompareArray(deps, hooks[currentHookIndex])
  ) {
    hooks[currentHookIndex] = deps;
    pendingEffects[currentHookIndex] = effect;
  }

  const i = currentHookIndex;
  currentHookIndex += 1;
  return hooks[i].value;
}

export function useRef<T>(initialValue: T): { current: T } {
  const { hooks } = currentInstance!;
  if (!hooks.hasOwnProperty(currentHookIndex)) {
    hooks[currentHookIndex] = { current: initialValue };
  }

  const i = currentHookIndex;
  currentHookIndex += 1;
  return hooks[i];
}

export function useState<T>(
  initialState: T | (() => T)
): [T, (callback: (prev: T) => T) => void] {
  const { hooks } = currentInstance!;

  if (!hooks.hasOwnProperty(currentHookIndex)) {
    const index = currentHookIndex;
    const dispatch = currentInstance?.dispatch;
    const thisHook: any[] = [
      typeof initialState === "function"
        ? (initialState as () => T)()
        : initialState,
      undefined,
    ];

    hooks[index] = thisHook;

    thisHook[1] = (callback: (state: T) => T) => {
      thisHook[0] = callback(thisHook[0]);
      dispatch!();
    };
  }

  const i = currentHookIndex;
  currentHookIndex += 1;
  return hooks[i];
}

export function useMemo<T>(callback: () => T, deps: any[]): T {
  const { hooks } = currentInstance!;

  if (!hooks.hasOwnProperty(currentHookIndex)) {
    hooks[currentHookIndex] = {
      value: callback(),
      deps,
    };
  } else {
    const current = hooks[currentHookIndex];
    if (!shallowCompareArray(deps, current.deps)) {
      current.value = callback();
      current.deps = deps;
    }
  }

  const i = currentHookIndex;
  currentHookIndex += 1;
  return hooks[i].value;
}
