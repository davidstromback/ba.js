import type { Instance } from "./factory";
import type { Styled } from "./types";

export const styled: Styled = function (this: Instance, element, style) {
  const className = this.css(style);

  this.css({})

  const component: any = (...args: any[]) => {
    const vdom = element(...args);

    vdom.props.class = vdom.props.class
      ? className + " " + vdom.props.class
      : className;

    return vdom;
  };

  component.toString = () => "." + className;

  return component;
};
