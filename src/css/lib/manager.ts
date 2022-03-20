const { hasOwnProperty } = Object.prototype;

export interface Manager {
  has: (key: string) => boolean;
  enter: (key: string, css?: StyleSheet) => void;
  exit: (key: string) => void;
}

const getDefaultManager = (() => {
  let defaultManager: Manager;
  return () => {
    if (typeof defaultManager === "undefined") {
      const element = document.createElement("style");
      document.head.appendChild(element);
      defaultManager = createManager(element);
    }

    return defaultManager;
  };
})();

export const createManager = (element?: HTMLStyleElement): Manager => {
  if (typeof element === "undefined") return getDefaultManager();

  const nodes: Record<string, Node> = {};
  const count: Record<string, number> = {};

  let timeout: ReturnType<typeof setTimeout> | undefined;
  let maybeUnused: string[] = [];

  const has = (key: string) => hasOwnProperty.call(nodes, key);

  const clean = () => {
    for (const key of maybeUnused) {
      if (count[key] === 0) {
        element.removeChild(nodes[key]);
        delete nodes[key];
        delete count[key];
      }
    }

    maybeUnused = [];
    timeout = undefined;
  };

  const requestClean = () => {
    if (typeof timeout !== "undefined") {
      clearTimeout(timeout);
    }
    timeout = setTimeout(clean, 1000);
  };

  const enter = (key: string, css?: string) => {
    if (has(key)) {
      count[key] += 1;
    } else {
      if (typeof css === "undefined") {
        throw new Error(`missing css for non-existing key ${key}`);
      }
      nodes[key] = element.appendChild(document.createTextNode(css));
      count[key] = 1;
    }
  };

  const exit = (key: string) => {
    count[key] -= 1;
    if (count[key] <= 0) {
      maybeUnused.push(key);
      requestClean();
    }
  };

  return {
    has,
    enter,
    exit,
  };
};
