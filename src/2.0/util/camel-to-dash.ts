const replacer = (match: string) => {
  return "-" + match.toLowerCase();
};

export const camelToDash = (camel: string) => {
  return camel.replace(/[A-Z]/g, replacer);
};
