import type { Literal, Node } from "../types";
import type { Visitor } from "../util/visit";

import { visit } from "../util/visit";
import { parse } from "./visitors/parse";
import { createRoot } from "./node";
import { stringify } from "./stringify";

export const process = (() => {
  return (root: Literal, transformers: Visitor<Node>[]) => {
    return stringify(visit<Node>(createRoot(root), parse, ...transformers));
  };
})();
