import { Child, DOMNode } from "./types";
import { isDomLiteral, isParent } from "./util/type-guards";

const queue: Array<Child> = [];
let current: Child | undefined;

export function unmountChild(child: Child, domParent: DOMNode) {
  current = child;

  do {
    if (isDomLiteral(current)) {
      domParent.removeChild(current.dom);
    } else if (isParent(current)) {
      queue.push(...current.children);
    }

    current = queue.shift();
  } while (typeof current !== "undefined");
}
