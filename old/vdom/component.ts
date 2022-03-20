import type {
  ElementAttributes,
  ElementType,
  VDOMChild,
  VDOMElement,
} from "./types";

export type ComponentFn<Props extends Record<string, any> = any> = (
  props: Props
) => VDOMChild | false | null | undefined;

type WithChildren<C, P = {}> = Omit<P, "children"> &
  (undefined extends C ? { children?: C } : { children: C });

export type ElementProps<T = any> = {
  key?: string | number;
} & (T extends ElementType
  ? ElementAttributes<T>
  : T extends ComponentFn<infer P>
  ? P
  : never);

export type ElementFactory<T = ElementType | ComponentFn, R = VDOMElement> =
  {} extends ElementProps<T>
    ? ElementProps<T> extends WithChildren<infer C>
      ? {
          (props?: ElementProps<T>, children?: C): R;
          (children?: C): R;
        }
      : {
          (props?: ElementProps<T>): R;
        }
    : ElementProps<T> extends WithChildren<infer C>
    ? undefined extends C
      ? {
          (props: ElementProps<T>, children?: C): R;
        }
      : {
          (props: WithChildren<C | undefined, ElementProps<T>>, children: C): R;
          (props: ElementProps<T>): R;
        } & ({} extends WithChildren<C | undefined, ElementProps<T>>
          ? {
              (children: C): R;
            }
          : {})
    : {
        (props: ElementProps<T>): R;
      };

const createFactory = <T extends ElementType | ComponentFn>(type: T) => {
  return ((arg1?: any, arg2?: any): any => {
    const props = Array.isArray(arg1) ? { children: arg1 } : { ...arg1 };

    if (arg2) {
      props.children = arg2;
    }

    const { key } = props;

    delete props.key;

    return { key, type, props };
  }) as ElementFactory<T>;
};

export { createFactory as component };
