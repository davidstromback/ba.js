import type { Node, Literal, CallbackLiteral } from "../types";

import { ROOT, createNode } from "./node";
import { visit } from "./util/visit";
import { parse } from "./visitors/parse";
import { split } from "./visitors/split";
import { units } from "./visitors/units";
import { selectors } from "./visitors/selectors";
import { hoist } from "./visitors/hoist";

export const process = (css: CallbackLiteral, props: any = undefined) => {
  const root = createNode(ROOT, css, undefined, undefined);

  visit<Node>(root, [parse(props), split, units, selectors, hoist]);

  return root;
};
