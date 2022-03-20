import { Context, VDOMChildren, VDOMContextProvider } from "./types";
import { CONTEXT } from "./util/type-guards";
import { sanitize } from "./vdom";

export const createContext = <T>(defaultValue: T): Context<T> => {
  const context = (
    value: T,
    children: VDOMChildren
  ): VDOMContextProvider<T> => ({
    type: CONTEXT,
    value,
    context,
    children: sanitize(children),
    consumers: [],
  });

  context.defaultValue = defaultValue;

  return context;
};






export function createContext<T>(defaultValue: T): Context<T> {
    const context: Context<T> = Object.assign(
      () => {
        const { provider } = useHook<ConsumeContext<T>>(
          isConsumeContext,
          (hook, component) => {
            if (typeof hook === "undefined") {
              const provider = findProvider(component, context);
  
              if (typeof provider !== "undefined") {
                provider.consumers.push(component);
              }
  
              return { type: CONSUME_CONTEXT, context, provider };
            }
  
            if (hook.context !== context) {
              if (typeof hook.provider !== "undefined") {
                hook.provider.consumers.splice(
                  hook.provider.consumers.indexOf(component)
                );
                hook.provider = undefined;
              }
  
              const provider = findProvider(component, context);
  
              if (typeof provider !== "undefined") {
                provider.consumers.push(component);
                hook.provider = provider;
              }
            }
  
            return hook;
          }
        );
  
        if (typeof provider === "undefined") {
          return defaultValue;
        }
  
        return provider.value;
      },
      (value: T) => {
        useHook<ProvideContext<T>>(
          (hook): hook is ProvideContext<T> =>
            isProvideContext(hook) && hook.context === context,
          (hook) => {
            if (typeof hook === "undefined") {
              return {
                type: PROVIDE_CONTEXT,
                context: context,
                value,
                consumers: [],
              };
            }
  
            const { needsUpdate } = getCurrentUpdate();
  
            if (value !== hook.value) {
              hook.value = value;
  
              for (const consumer of hook.consumers) {
                needsUpdate.unshift(consumer);
                consumer.needsUpdate = true;
              }
            }
  
            return hook;
          }
        );
      },
    ];
  
    return context;
}
export const findProvider = <T>(node: Child, context: Context<T>) => {
  let current: Node = node.parent;

  while (isChild(current)) {
    if (isComponent(current)) {
      for (const hook of current.hooks) {
        if (isProvideContext<T>(hook)) {
          if (hook.context === context) {
            return hook;
          }
        }
      }
    }

    current = current.parent;
  }

  return undefined;
};
