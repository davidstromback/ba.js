import type { Node } from "../../types";
import type { Visitor } from "../../util/visit";

const matchCamel = /[A-Z]/g;

const replaceCamel = (match: string) => "-" + match.toLowerCase();

const camelToDash = (camel: string) => camel.replace(matchCamel, replaceCamel);

export const dashify: Visitor<Node> = (node) => {
  for (let i = 0; i < node.declarations.length; i++) {
    node.declarations[i][0] = camelToDash(node.declarations[i][0]);
  }
};
