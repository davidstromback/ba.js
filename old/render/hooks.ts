import { getContext, getContextValue } from "./context";
import { createRef, Ref } from "./ref";
import { ComponentInstance } from "./types";

function shallowCompareArray(a: any[], b: any[]) {
  return a.length === b.length && a.every((v, i) => Object.is(v, b[i]));
}

let currentHookIndex = 0;
let currentInstance: ComponentInstance | undefined;

interface Hook {
  [key: string]: any
  index: number;
}

export function renderWithHooks(component: ComponentInstance) {
  const { vdom } = component;
  const { type: renderFunc, props } = vdom;

  currentHookIndex = 0;
  currentInstance = component;

  const result = renderFunc(props);

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

export function useContext<T>(context: { ref: Ref<T> }): T {
  const { ref } = currentInstance!;
  const contextInstance = getContext(context.ref, currentInstance!);
  const contextValue = contextInstance?.vdom.props.value ?? context.ref.current;

  if (typeof contextInstance !== "undefined") {
    contextInstance.shouldUpdate?.delete(ref);
  }

  useEffect(() => {
    contextInstance?.subscribers.push(ref);
    return () =>
      contextInstance?.subscribers.splice(
        contextInstance?.subscribers.indexOf(ref),
        1
      );
  }, []);

  return contextValue;
}

export function useRef<T>(initialValue: T): { current: T } {
  const { hooks } = currentInstance!;
  if (!hooks.hasOwnProperty(currentHookIndex)) {
    hooks[currentHookIndex] = createRef(initialValue);
  }

  const i = currentHookIndex;
  currentHookIndex += 1;
  return hooks[i];
}

interface UseStateHook<T = any> {
  dispatch: () => void;
  prevDeps?: unknown[];
  state: T;
  setState: (callback: (prev: T) => T) => void;
}

export interface SetState<T = any> {
  (next: T extends Function ? T : T | ((prev: T) => T)): void;
}

const setState: SetState = function setState(this: UseStateHook, next) {
  if (typeof next === "function") {
    this.state = next(this.state);
  } else {
    this.state = next;
  }

  this.dispatch();
};

export interface UseState {
  <T>(): [T | undefined, SetState<T | undefined>];
  <T>(initialState: T | (() => T)): [T, SetState<T>];
  <T>(computeState: (prev?: T) => T, deps: unknown[]): [T, SetState<T>];
}

export const useState: UseState = function (state?: any, deps?: unknown[]) {
  const { hooks } = currentInstance!;
  const index = currentHookIndex;
  currentHookIndex += 1;

  if (!hooks.hasOwnProperty(index)) {
    const dispatch = currentInstance?.dispatch;

    const hook = {
      dispatch,
      setState,
      state: typeof state === "function" ? state() : state,
      prevDeps: deps,
    };

    hook.setState = setState.bind(hook);

    hooks[index] = hook;
  } else {
    const hook = hooks[index];

    if (
      (typeof deps === "undefined" && typeof hook.prevDeps !== "undefined") ||
      (typeof deps !== "undefined" && typeof hook.prevDeps === "undefined") ||
      (typeof deps !== "undefined" &&
        typeof hook.prevDeps !== "undefined" &&
        !shallowCompareArray(deps, hook.prevDeps))
    ) {
      hook.state = typeof state === "function" ? state(hook.state) : state;
    }

    hook.prevDeps = deps;
  }

  const hook = hooks[index];

  return [hook.state, hook.setState] as [any, any];
};

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
