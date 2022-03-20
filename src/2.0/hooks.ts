import {
  Node,
  Component,
  ConsumeContext,
  ConsumeContextType,
  Context,
  Hook,
  ProvideContext,
  ProvideContextType,
  Ref,
  SetState,
  UseCallback,
  UseCallbackType,
  UseEffect,
  UseEffectType,
  UseMemo,
  UseMemoType,
  UseRef,
  UseRefType,
  UseState,
  UseStateType,
  Child,
} from "./types";

import { createRef } from "./ref";
import { assert } from "./util/assert";
import { dispatch, getCurrentUpdate } from "./dispatch";
import { isChild, isComponent, isParent } from "./util/type-guards";

const EFFECT: UseEffectType = 0;
const REF: UseRefType = 1;
const STATE: UseStateType = 2;
const MEMO: UseMemoType = 3;
const CALLBACK: UseCallbackType = 4;
const PROVIDE_CONTEXT: ProvideContextType = 5;
const CONSUME_CONTEXT: ConsumeContextType = 6;

export const isUseEffect = (hook: Hook): hook is UseEffect =>
  hook.type === EFFECT;
const isUseRef = <T>(hook: Hook): hook is UseRef<T> => hook.type === REF;
const isUseState = <T>(hook: Hook): hook is UseState<T> => hook.type === STATE;
const isUseMemo = <T>(hook: Hook): hook is UseMemo<T> => hook.type === MEMO;
const isUseCallback = <T>(hook: Hook): hook is UseCallback<T> =>
  hook.type === CALLBACK;
export const isProvideContext = <T>(hook: Hook): hook is ProvideContext<T> =>
  hook.type === PROVIDE_CONTEXT;
export const isConsumeContext = <T>(hook: Hook): hook is ConsumeContext<T> =>
  hook.type === CONSUME_CONTEXT;

function shallowCompareArray(a: any[], b: any[]) {
  return a.length === b.length && a.every((v, i) => Object.is(v, b[i]));
}

let current:
  | { index: number; component: Component; isInitialRender: boolean }
  | undefined;

const invalidHookCallMessage = "hooks may only be called during render";
const hooksChangedMessage = "hooks changed between renders";

export const renderWithHooks = (
  component: Component,
  props: Record<string, unknown>,
  isInitialRender: boolean
) => {
  current = { index: 0, component, isInitialRender };

  const result = component.vdom.type(props);

  assert(current.index === component.hooks.length, hooksChangedMessage);

  current = undefined;

  return result;
};

const validate = <T extends Hook>(hook: Hook, type: T['type']): hook is T => {
    return hook?.type === type
}

const useHook = <T extends Hook>(
  type: T['type'],
  callback: (prev: T | undefined, component: Component) => Omit<T, 'type'>
): T => {
  assert(typeof current !== "undefined", invalidHookCallMessage);

  const { index, component, isInitialRender } = current;
  const { hooks } = component;

  let next: T;
  if (index >= hooks.length) {
    assert(isInitialRender, hooksChangedMessage);
    next = callback(undefined, component) as T;
  } else {
    const hook = hooks[index];
    assert(validate(hook, type), hooksChangedMessage);
    next = callback(hook, component) as T;
  }

  next.type = type;

  hooks[index] = next;

  current.index += 1;

  return next;
};

export const useEffect = (
  effect: () => void | (() => void),
  deps: Array<unknown>
) => {
  useHook<UseEffect>(EFFECT, (hook) => {
    if (typeof hook === "undefined") {
      return { pendingEffect: effect, deps };
    }

    if (!shallowCompareArray(hook.deps, deps)) {
      hook.pendingEffect = effect;
      hook.deps = deps;
    }

    return hook;
  });
};

export const useRef = <T>(initialValue: T): Ref<T> => {
  const { ref } = useHook<UseRef<T>>(REF, (hook) => {
    return hook ?? { ref: createRef(initialValue) };
  });

  return ref;
};

export const useState: {
  <T>(): [T | undefined, SetState<T | undefined>];
  <T>(initialState: T | (T & Function)): [T, SetState<T>];
} = <T>(initialState?: T | (T & Function)): [T, SetState<T>] => {
  const { state, setState } = useHook<UseState<T>>(
    STATE,
    (prev, component) => {
      const hook: UseState<T> = prev ?? {
        type: STATE,
        state:
          typeof initialState === "function" ? initialState() : initialState,
        setState: (action) => {
          console.log("dispatch");

          assert(
            component.mounted || !component.unmounting,
            "attempted dispatch on unmounted component"
          );

          dispatch((update) => {
            if (!component.unmounting) {
              const next =
                typeof action === "function"
                  ? (action as (prev: T) => T)(hook.state)
                  : action;

              if (next !== hook.state) {
                hook.state = next;
                update.needsUpdate.push(component);
                component.needsUpdate = true;
              }
            }
          });
        },
      };

      return hook;
    }
  );

  return [state, setState];
};

export const useMemo = <T>(factory: () => T, deps: Array<unknown>) => {
  const { value } = useHook<UseMemo<T>>(MEMO, (hook) => {
    if (typeof hook === "undefined") {
      return { type: MEMO, value: factory(), deps };
    }

    if (!shallowCompareArray(hook.deps, deps)) {
      hook.value = factory();
      hook.deps = deps;
    }

    return hook;
  });

  return value;
};

export const useCallback = <T extends Function>(
  callback: T,
  deps: Array<unknown>
) => {
  const { current } = useHook<UseCallback<T>>(CALLBACK, (hook) => {
    if (typeof hook === "undefined") {
      return { type: CALLBACK, current: callback, deps };
    }

    if (!shallowCompareArray(hook.deps, deps)) {
      hook.current = callback;
      hook.deps = deps;
    }

    return hook;
  });

  return current;
};
