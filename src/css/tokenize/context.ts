import type { State, Token, TokenizeContext } from "./types";

import { isBreak, isWhitespace } from "./match";
import { text } from "./state";

export function commit(context: TokenizeContext) {
  const token: Token = {
    type: context.state.name,
    position: {
      from: context.tokenStart,
      to: { ...context.location },
    },
    prev: context.prevToken,
  };

  if (context.prevToken) {
    context.prevToken.next = token;
  }

  context.prevToken = token;
  context.tokenIsEmpty = true;
  context.tokenHasNonWhitespaceChars = false;
  context.didCommit = true;

  return token;
}

export function next(context: TokenizeContext, state: State) {
  if (!context.tokenIsEmpty) {
    commit(context);
  }

  context.state = state;
}

export function processChar(context: TokenizeContext, char: number) {
  context.prevChar = context.char;
  context.char = char;
  context.didCommit = false;
  context.state = context.state(context);
  context.tokenIsEmpty = false;

  if (!isWhitespace(char)) {
    context.tokenHasNonWhitespaceChars = true;
  }

  if (isBreak(context.char)) {
    context.location.col = 1;
    context.location.line++;
  } else {
    context.location.col++;
  }

  if (context.didCommit) {
    context.tokenStart = { ...context.location };
    return context.prevToken;
  }

  return undefined;
}

export function createContext(): TokenizeContext {
  const location = { line: 1, col: 1, offset: 0 };

  return {
    char: NaN,
    location,
    tokenStart: { ...location },
    prevChar: NaN,
    state: text,
    prevToken: undefined,
    inTag: false,
    inValue: false,
    tokenIsEmpty: true,
    didCommit: false,
    tokenHasNonWhitespaceChars: false,
  };
}
