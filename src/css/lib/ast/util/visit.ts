export type Visitor<T> = (node: T) => void;

type TreeLike<T> = { children: T[] };

/**
 * Traverses all nodes in the tree, starting from the root,
 * and calls the provided visitor functions with each node.
 */
export const visit = <T extends TreeLike<T>>(
  root: T,
  visitors: Visitor<T>[]
) => {
  const nodes = [root];

  let node = nodes.pop();
  while (typeof node !== "undefined") {
    for (let i = 0; i < visitors.length; i++) {
      visitors[i](node);
    }

    const { children } = node;

    // Push children in reverse order
    for (let i = children.length - 1; i >= 0; i--) {
      nodes.push(children[i]);
    }

    node = nodes.pop();
  }

  return root;
};
