import { updateStyleAttribute } from "../render/element";
import {useRef, useState } from "../render/hooks";
import {
  component,
    ComponentFn,
  ElementFactory,
  ElementProps,
  ElementType,
} from "../vdom";
import { transition, TransitionPhase, TransitionProps } from "./motion";

interface MoveValue {
  [key: string]: number;
}

interface MoveProps {
  enter?: MoveValue;
  exit?: MoveValue;
}

const measure = (element: HTMLElement, style?: Record<string, string>) => {
  const prev = Object.fromEntries(Object.entries(element.style));
  const next = { ...prev, ...style };
  updateStyleAttribute(element, next, prev);
  const brect = element.getBoundingClientRect().toJSON();
  updateStyleAttribute(element, prev, next);
  console.log(prev, next);
  console.log(brect);
  return brect;
};

interface TransitionOptions {
  enter?: Record<string, string>;
  entered?: Record<string, string>;
  exit?: Record<string, string>;
}

const matchCamel = /[A-Z]/g;

const replaceCamel = (match: string) => "-" + match.toLowerCase();

const camelToDash = (camel: string) => camel.replace(matchCamel, replaceCamel);

const createTransition = (
  options: TransitionOptions
): Record<TransitionPhase, Record<string, string>> => {
  const { enter = {}, entered = {}, exit = {} } = options;
  const keys = Object.keys({ ...enter, ...entered, ...exit });
  const transition =
    keys.map((key) => `${camelToDash(key)} 2000ms ease-in-out`).join(" ") ||
    "none";

  return {
    initial: {
      ...entered,
      visibility: "hidden",
      overflow: "hidden",
    },
    enter: { ...enter, transition, overflow: "hidden" },
    entering: { ...entered, transition, overflow: "hidden" },
    entered: { ...entered },
    exit: { ...entered, transition, overflow: "hidden" },
    exiting: { ...exit, transition, overflow: "hidden" },
  };
};

interface ChildProps {
  element: ElementFactory;
  elementProps: ElementProps;
  transition: Record<string, Record<string, string>>;
  phase: TransitionPhase;
}

export const childComponent = component((props: ChildProps) => {
  const { element, elementProps, transition, phase } = props;
  const elementRef = useRef<HTMLElement | undefined>(undefined);
  const [state] = useState<Record<string, string>>(
    (prev): Record<string, string> => {
      switch (phase) {
        case "enter":
        case "exit":
          if (elementRef.current) {
            const { height, width } =
              elementRef.current.getBoundingClientRect();

            return {
              height: height + "px",
              width: width + "px",
            };
          }
      }
      return prev ?? {};
    },
    [phase]
  );

  const style = {
    ...(phase === "entering" || phase === "exit" ? state : {}),
    ...transition[phase],
  };

  console.log(phase, style);

  return element({
    ...elementProps,
    ref: elementRef,
    style,
  });
});

export const move = <T extends ElementType | ComponentFn>(
  element: ElementFactory<T>,
  options: TransitionOptions
) => {
  return component(
    (props: Omit<TransitionProps, "children"> & Omit<ElementProps<T>, keyof Omit<TransitionProps, "children">>) => {
      const {
        animationKey,
        exiting,
        onExited,
        enterDuration = 2000,
        exitDuration = 2000,
        ...elementProps
      } = props;

      const t = createTransition(options);

      return transition(
        { animationKey, exiting, onExited, enterDuration, exitDuration },
        (phase) =>
          childComponent({
            phase,
            element,
            elementProps,
            transition: t,
          })
      );
    }
  );
};
