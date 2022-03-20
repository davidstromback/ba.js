import { getExplicitKey, isValidChild } from "../render/children";
import { isComponentVDom } from "../render/component";
import { SetState, useEffect, useRef, useState } from "../render/hooks";
import { isNodeVDom } from "../render/node";
import { component, div, VDOMChild, VDOMChildren, VDOMElement } from "../vdom";

const { hasOwnProperty } = Object.prototype;

const getChildMap = (
  children: VDOMChildren,
  mapFn?: (child: VDOMElement, key: string) => VDOMElement
) => {
  const map: Record<string, VDOMElement> = {};

  children.forEach((child) => {
    if (isValidChild(child)) {
      if (isNodeVDom(child) || !isComponentVDom(child)) {
        throw new TypeError("prescence expects all children to be components");
      }

      const key = getExplicitKey(child);

      if (!key) {
        throw new TypeError("prescence expects all children to be keyed");
      }

      if (hasOwnProperty.call(map, key)) {
        throw new TypeError(
          `prescence expects keys to be unique, found duplicate key ${key}`
        );
      }

      map[key] = mapFn ? mapFn(child, key) : child;
    }
  });

  return map;
};

const mergeChildMaps = (
  prev: Record<string, VDOMElement>,
  next: Record<string, VDOMElement>
) => {
  let vagrantKeysAcc: string[] = [];
  const prevKeys = Object.keys(prev);
  const nextKeys = Object.keys(next);
  const vagrantKeysByKey: Record<string, string[]> = {};

  for (let i = 0; i < prevKeys.length; i++) {
    const key = prevKeys[i];
    if (hasOwnProperty.call(next, key)) {
      if (vagrantKeysAcc.length) {
        vagrantKeysByKey[key] = vagrantKeysAcc;
        vagrantKeysAcc = [];
      }
    } else {
      vagrantKeysAcc.push(key);
    }
  }

  const result: Record<string, VDOMElement> = {};

  const appendToResult = (key: string) => {
    result[key] = hasOwnProperty.call(next, key) ? next[key] : prev[key];
  };

  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    vagrantKeysByKey[key]?.forEach(appendToResult);
    appendToResult(key);
  }

  vagrantKeysAcc.forEach(appendToResult);

  return result;
};

const cloneElement = (element: VDOMElement, props: any) => ({
  ...element,
  props: {
    ...element.props,
    ...props,
  },
});

const getInitialChildMap = (
  children: VDOMChildren,
  onExited: (key: string) => void
) => {
  return getChildMap(children, (child, key) => {
    return cloneElement(child, {
      animationKey: key,
      onExited,
      exiting: false,
    });
  });
};

const getNextChildMap = (
  nextChildren: VDOMChildren,
  prevMapping: Record<string, VDOMElement>,
  onExited: (key: string) => void
) => {
  const nextMapping = getChildMap(nextChildren);
  const children = mergeChildMaps(prevMapping, nextMapping);
  const keys = Object.keys(children);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const child = children[key];
    const inNext = hasOwnProperty.call(nextMapping, key);
    const inPrev = hasOwnProperty.call(prevMapping, key);
    const isExiting = prevMapping[key]?.props.exiting;

    if (inNext && (!inPrev || isExiting)) {
      children[key] = cloneElement(child, {
        animationKey: key,
        exiting: false,
        onExited,
      });
    } else if (!inNext && inPrev) {
      if (!isExiting) {
        children[key] = cloneElement(child, { exiting: true });
      }
    } else {
      children[key] = cloneElement(child, {
        animationKey: key,
        exiting: isExiting,
        onExited,
      });
    }
  }

  return children;
};

export const prescence = component((props: { children?: VDOMChildren }) => {
  const { children } = props;
  const setChildMapRef = useRef<SetState<Record<string, VDOMElement>>>(
    () => {}
  );

  const handleExited = useRef((key: string) => {
    setChildMapRef.current((prev) => {
      if (!hasOwnProperty.call(prev, key)) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }).current;

  const [childMap, setChildMap] = useState<Record<string, VDOMElement>>(
    (prev) => {
      return typeof prev === "undefined"
        ? getInitialChildMap(children ?? [], handleExited)
        : getNextChildMap(children ?? [], prev, handleExited);
    },
    [children]
  );

  setChildMapRef.current = setChildMap;

  return div(Object.values(childMap));
});

export type TransitionPhase =
  | "initial"
  | "enter"
  | "entering"
  | "entered"
  | "exit"
  | "exiting";

export interface TransitionProps {
  animationKey?: string;
  exiting?: boolean;
  onExited?: (key: string) => void;
  children: (phase: TransitionPhase) => VDOMChild;
  enterDuration?: number;
  exitDuration?: number;
}

export const transition = component((props: TransitionProps) => {
  const {
    animationKey,
    exiting,
    onExited,
    children,
    enterDuration = 500,
    exitDuration = 500,
  } = props;

  const [phase, setPhase] = useState<TransitionPhase>(
    (prev) => {
      if (typeof prev === "undefined" || !exiting) {
        return "initial";
      }
      if (exiting) {
        if (prev === "entering") return "exiting";
        return "exit";
      }
      return prev;
    },
    [exiting]
  );

  useEffect((): void | (() => void) => {
    let timeout: ReturnType<typeof setTimeout>;
    let animationFrame: ReturnType<typeof requestAnimationFrame>;
    switch (phase) {
      case "initial":
        timeout = setTimeout(() => setPhase("enter"));
        break;
      case "enter":
        animationFrame = requestAnimationFrame(() => setPhase("entering"));
        break;
      case "entering":
          timeout = setTimeout(() => setPhase("entered"), enterDuration);
        break;
      case "exit":
        animationFrame = requestAnimationFrame(() => setPhase("exiting"));
        break;
      case "exiting":
          timeout = setTimeout(() => {
            if (onExited && animationKey) {
              onExited(animationKey);
            }
          }, exitDuration);
        break;
    }

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationFrame);
    };
  }, [phase, setPhase, onExited]);

  return children(phase);
});
