interface Animation {
  callback: () => {};
}

interface AnimateableElementOptions {
  type: string;
  props: Record<string, string>
}

interface AnimateableElement {
  currentAnimation: Animation | undefined;
  props: Record<string, any>;
}

const createAnimateableElement = (
  options: AnimateableElementOptions,
): AnimateableElement => {
  const { type, props } = options;

  return {
      
  };
};

const animate = (element: AnimateableElement) => {};

const measure = (element: AnimateableElement) => {};

const destroy = (element: AnimateableElement) => {};
