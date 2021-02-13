import type {
  ElementAttributes,
  ElementType,
  VDOMChild,
  VDOMChildren,
  VDOMElement,
} from "./types";

type PropsWithKey<Props = {}> = Props & { key?: string | number };

export type ComponentFn<Props = Record<string, any>> = (props: Props) => VDOMChild | false | null | undefined;

export type ComponentElement<Props = Record<string, any>> = undefined extends Props
  ? {
      (props?: PropsWithKey): VDOMChild;
    }
  : (Partial<Props> extends Props
      ? Props extends { children?: VDOMChildren }
        ? {
            (props?: PropsWithKey<Props>, children?: VDOMChildren): VDOMElement;
            (children?: VDOMChildren): VDOMElement;
          }
        : {
            (props?: PropsWithKey<Props>): VDOMElement;
          }
      : {}) &
      (Props extends { children?: VDOMChildren }
        ? {
            (props: PropsWithKey<Props>, children?: VDOMChildren): VDOMElement;
          }
        : {
            (props: PropsWithKey<Props>): VDOMElement;
          });

export type PrimitiveElement<Type extends ElementType> = {
  (children?: VDOMChildren): VDOMElement;
  (
    props?: PropsWithKey<ElementAttributes<Type>>,
    children?: VDOMChildren
  ): VDOMElement;
};

const component: {
  <Props extends Record<string, any> | undefined = undefined>(
    type: ComponentFn<Props> | (() => VDOMChild | false | null | undefined)
  ): Props extends { key: unknown } ? never : ComponentElement<Props>;
  <Type extends ElementType>(type: Type): PrimitiveElement<Type>;
} = (type: ElementType | ComponentFn<any>) => {
  return (arg1?: Record<string, any> | VDOMChildren, arg2?: VDOMChildren) => {
    if (arg1 !== undefined) {
      if (Array.isArray(arg1)) {
        return { type, props: {}, children: arg1 };
      }

      const { key, children, ...props } = arg1;

      return { key, type, props, children: arg2 ?? children ?? [] };
    }

    return { type, props: {}, children: [] };
  };
};

export { component };
