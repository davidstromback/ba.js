export const hash = (str: string) => {
  let v = 0x811c9dc5;

  for (let i = 0, l = str.length; i < l; i++) {
    v ^= str.charCodeAt(i);
    v += (v << 1) + (v << 4) + (v << 7) + (v << 8) + (v << 24);
  }

  return ("0000000" + (v >>> 0).toString(16)).substr(-8);
};
