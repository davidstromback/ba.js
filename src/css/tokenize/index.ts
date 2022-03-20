import { commit, createContext, processChar } from "./context";

export function* tokenize(string: string, context = createContext()) {
  for (let i = 0; i < string.length; i++) {
    const token = processChar(context, string.charCodeAt(i));

    if (token) {
      yield token;
    }
  }

  yield commit(context);

  return context;
}

function* template(strings: TemplateStringsArray, ...keys: string[]) {
  for (const key of keys) {
  }
}
