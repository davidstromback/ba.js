import { getExplicitKey, isValidChild } from "../render/children";
import { isComponentVDom } from "../render/component";
import { useEffect, useState } from "../render/hooks";
import { component, div, VDOMChild, VDOMChildren, VDOMElement } from "../vdom";

const getChildMap = (
  children: VDOMChildren,
  mapFn?: (child: VDOMElement, key: string) => VDOMElement
) => {
  const map = new Map<string, VDOMElement>();

  children.forEach((child) => {
    if (isValidChild(child)) {
      if (!isComponentVDom(child)) {
        throw new TypeError("prescence expects all children to be components");
      }

      const key = getExplicitKey(child);

      if (!key) {
        throw new TypeError("prescence expects all children to be keyed");
      }

      if (map.has(key)) {
        throw new TypeError(
          `prescence expects keys to be unique, found duplicate key ${key}`
        );
      }

      map.set(key, mapFn ? mapFn(child, key) : child);
    }
  });

  return map;
};

const mergeChildMaps = (
  prev: Map<string, VDOMElement>,
  next: Map<string, VDOMElement>
) => {
  let vagrantKeysAcc: string[] = [];
  const vagrantKeysByKey: Record<string, string[]> = {};

  for (const key of prev.keys()) {
    if (next.has(key)) {
      if (vagrantKeysAcc.length) {
        vagrantKeysByKey[key] = vagrantKeysAcc;
        vagrantKeysAcc = [];
      }
    } else {
      vagrantKeysAcc.push(key);
    }
  }

  const result = new Map<string, VDOMElement>();

  const appendToResult = (key: string) => {
    result.set(key, next.get(key) ?? prev.get(key)!);
  };

  for (const key of next.keys()) {
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
      onExited: onExited.bind(undefined, key),
      exiting: false,
    });
  });
};

const getNextChildMap = (
  nextChildren: VDOMChildren,
  prevMapping: Map<string, VDOMElement>,
  onExited: (key: string) => void
) => {
  const nextMapping = getChildMap(nextChildren);
  const children = mergeChildMaps(prevMapping, nextMapping);

  children.forEach((child, key) => {
    const inNext = nextMapping.has(key);
    const inPrev = prevMapping.has(key);
    const isExiting = prevMapping.get(key)?.props.exiting;

    if (inNext && (!inPrev || isExiting)) {
      children.set(
        key,
        cloneElement(child, {
          exiting: false,
          onExited: onExited.bind(undefined, key),
        })
      );
    } else if (!inNext && inPrev) {
      if (!isExiting) {
        children.set(key, cloneElement(child, { exiting: true }));
      }
    } else {
      children.set(
        key,
        cloneElement(child, {
          exiting: isExiting,
          onExited: onExited.bind(undefined, key),
        })
      );
    }
  });

  return children;
};

export const prescence = component((props: { children?: VDOMChildren }) => {
  const { children = [] } = props;
  const [childMap, setChildMap] = useState<
    Map<string, VDOMElement> | undefined
  >(undefined);

  useEffect(() => {
    const handleExited = (key: string) => {
      setChildMap((prev) => {
        if (!prev || !prev.has(key)) return prev;
        const next = new Map(prev);
        next.delete(key);
        return next;
      });
    };

    setChildMap((prev) => {
      return prev
        ? getNextChildMap(children, prev, handleExited)
        : getInitialChildMap(children, handleExited);
    });
  }, [children, setChildMap]);

  if (!childMap) return null;

  return div(Array.from(childMap.values()));
});

export type TransitionPhase = "entering" | "entered" | "exiting";

export interface TransitionProps {
  exiting?: boolean;
  onExited?: () => void;
  render: (phase: TransitionPhase) => VDOMChild;
  enterDuration?: number;
  exitDuration?: number;
}

export const transition = component((props: TransitionProps) => {
  const {
    exiting,
    onExited,
    render,
    enterDuration = 0,
    exitDuration = 0,
  } = props;

  const [entering, setEntering] = useState(true);

  useEffect((): void | (() => void) => {
    if (exiting) {
      if (onExited) {
        const timeout = setTimeout(onExited, exitDuration);
        
        
        return () => clearTimeout(timeout);
      }
    } else {
      if (!entering) {
        setEntering(() => true);
      } else {
        const onEntered = () => setEntering(() => false);
        const timeout = setTimeout(onEntered, enterDuration);

        return () => clearTimeout(timeout);
      }
    }
  }, [exiting, entering]);

  return render(exiting ? "exiting" : entering ? "entering" : "entered");
});
