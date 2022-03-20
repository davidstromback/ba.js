import type { CSS, Global, Styled, Options, Node } from "./types";
import type { Visitor } from "./ast/util/visit";
import type { Manager } from "./manager";

import { createManager } from "./manager";
import { css } from "./css";
import { global } from "./global";
import { styled } from "./styled";

export interface Instance {
  css: CSS;
  global: Global;
  styled: Styled;
  options: Options;
  manager: Manager;
}

const { hasOwnProperty } = Object.prototype;

export const createCss = (options: Options) => {
  if (!hasOwnProperty.call(options, "element")) {
    options.element = document.createElement("style");
    document.head.appendChild(options.element);
  }

  const instance: Instance = {
    manager: createManager(options.element),
    css,
    global,
    styled,
    options,
  };

  instance.css = css.bind(instance);
  instance.global = global.bind(instance);
  instance.styled = styled.bind(instance);

  return {
    css: instance.css,
    global: instance.global,
    styled: instance.styled,
  };
};
