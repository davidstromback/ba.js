import type { Node } from "../../types";
import type { Visitor } from "../util/visit";

const matchCamel = /[A-Z]/g;

const replaceCamel = (match: string) => "-" + match.toLowerCase();

const camelToDash = (camel: string) => camel.replace(matchCamel, replaceCamel);

export const dashify: Visitor<Node> = (node) => {
  const { declarations } = node;
  const { length } = declarations;

  for (let i = 0; i < length; i++) {
    const declaration = declarations[i];

    declaration[0] = camelToDash(declaration[0]);
  }
};
