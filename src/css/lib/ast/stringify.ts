import type { Child, Node, Value } from "../types";

interface Printer {
  setBuffer: (next: string[]) => void;
  openBracket: (selector: string) => void;
  printDeclaration: (key: string, value: string) => void;
  closeBracket: () => void;
}

const stringifyValue = (value: Value) => {
  return Array.isArray(value) ? value.join(" ") : value.toString();
};

const createStringifier = (printer: Printer) => {
  const { setBuffer, openBracket, printDeclaration, closeBracket } = printer;

  const inner = (node: Node) => {
    const { declarations, children } = node;

    for (let i = 0; i < declarations.length; i++) {
      const declaration = declarations[i];
      printDeclaration(declaration[0], stringifyValue(declaration[1]));
    }

    for (let i = 0; i < children.length; i++) {
      outer(children[i]);
    }
  };

  const outer = (node: Child) => {
    openBracket(node.selector);
    inner(node);
    closeBracket();
  };

  return (root: Node) => {
    const buffer: string[] = [];

    setBuffer(buffer);

    inner(root);

    return buffer.join("");
  };
};

const minifyPrinter = ((): Printer => {
  let buffer = [];

  return {
    setBuffer: (next) => {
      buffer = next;
    },
    printDeclaration: (key, value) => buffer.push(key, ": ", value, ";"),
    openBracket: (selector: string) => buffer.push(selector, "{"),
    closeBracket: () => buffer.push("}"),
  };
})();

const prettyPrinter = ((): Printer => {
  let indent = "";
  let buffer = [];

  return {
    setBuffer: (next) => {
      indent = "";
      buffer = next;
    },
    printDeclaration: (key, value) => {
      buffer.push(indent, key, ": ", value, ";\n");
    },
    openBracket: (selector) => {
      buffer.push(indent, selector, " {\n");
      indent += "  ";
    },
    closeBracket: () => {
      indent = indent.slice(2);
      buffer.push(indent, "}\n\n");
    },
  };
})();

export const minified = createStringifier(minifyPrinter);
export const pretty = createStringifier(prettyPrinter);
