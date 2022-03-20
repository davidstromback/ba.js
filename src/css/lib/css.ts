import type { Instance } from "./factory";
import type { CSS, Root, Node, Child } from "./types";

import { process } from "./ast/process";
import { DECLARATION_BLOCK, NESTED_AT_RULE } from "./ast/node";
import { hash } from "./util/hash";
import { minified } from "./ast/stringify";
import { CallbackLiteral } from "..";

const matchConditionText = /@(?:media|supports)\s*(\(.*\))/;
const element = document.createElement("div");

const createRules = (children: Child[], ruleList: CSSRuleList) => {
  let i = 0;

  for (const child of children) {
    switch (child.type) {
      case DECLARATION_BLOCK: {
        const rule = new CSSStyleRule();
        rule.selectorText = child.selector;
        for (const [key, value] of child.declarations) {
          rule.style[key as any] = Array.isArray(value)
            ? value.join(" ")
            : value.toString();
        }
        ruleList[i++] = rule;
        break;
      }
      case NESTED_AT_RULE: {
        const conditionText = child.selector.match(matchConditionText)?.[1];
        if (typeof conditionText !== "undefined") {
          const rule = new CSSConditionRule();
          rule.conditionText = child.selector.slice(2);
          createRules(child.children, rule.cssRules);
          ruleList[i++] = rule;
        }
        break;
      }
    }
  }
};

const createStyleSheet = (root: Root) => {
  const stylesheet = new CSSStyleSheet();
  createRules(root.children, stylesheet.cssRules);
  return stylesheet
};

export function CSS <T>(this: Instance, css: CallbackLiteral<T>) {
  const callback = (props: T) => {
    const className = hash(minified(process({ [this.options.prefix]: css }, props)));

    this.manager.enter(
        className,
        this.manager.has(className)
          ? undefined
          : createStyleSheet(process({ ["." + className]: css }, props))
      );
  }
};
