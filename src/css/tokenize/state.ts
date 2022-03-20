import type { State, TokenizeContext } from "./types";

import { next } from "./context";
import {
  isAlphaNumeric,
  isCloseMarker,
  isEquals,
  isEscape,
  isLatin,
  isQuote,
  isTagCloser,
  isTagOpener,
  isWhitespace,
} from "./match";

function before(context: TokenizeContext, state: State) {
  next(context, state);
  return state(context);
}

function after(context: TokenizeContext, state: State) {
  next(context, state);
  return state;
}

function invalidCharMessage(context: TokenizeContext) {
  return (
    `Invalid char "${String.fromCharCode(context.char)}" ` +
    `at line ${context.location.line}, column ${context.location.col}, ` +
    `expected ${context.state.name}.`
  );
}

export const name: State = function name(context) {
  if (isEquals(context.char)) {
    return before(context, equals);
  }

  if (isTagCloser(context.char)) {
    return before(context, tagCloser);
  }

  if (isCloseMarker(context.char)) {
    return before(context, closeMarker);
  }

  const isValid = context.tokenHasNonWhitespaceChars ? isLatin : isAlphaNumeric;

  if (!isWhitespace(context.char) && isValid(context.char)) {
    if (context.tokenHasNonWhitespaceChars && isWhitespace(context.prevChar)) {
      return before(context, text);
    }

    return name;
  }

  throw new Error(invalidCharMessage(context));
};

export const closeMarker: State = function closeMarker(context) {
  if (isWhitespace(context.char)) {
    return closeMarker;
  }

  if (isCloseMarker(context.char)) {
    return after(context, closeMarker);
  }

  throw new Error(invalidCharMessage(context));
};

export const equals: State = function equals(context) {
  if (isWhitespace(context.char)) {
    return equals;
  }

  if (isEquals(context.char)) {
    return after(context, quote);
  }

  throw new Error(invalidCharMessage(context));
};

export const quote: State = function quote(context) {
  if (isWhitespace(context.char)) {
    return quote;
  }

  if (isQuote(context.char)) {
    if (context.inValue) {
      context.inValue = false;
      return after(context, name);
    } else {
      context.inValue = true;
      return after(context, value);
    }
  }

  throw new Error(invalidCharMessage(context));
};

export const tagCloser: State = function tagCloser(context) {
  if (isWhitespace(context.char)) {
    return tagCloser;
  }

  if (isTagCloser(context.char) && context.inTag) {
    context.inTag = false;
    return after(context, text);
  }

  throw new Error(invalidCharMessage(context));
};

export const tagOpener: State = function tagOpener(context) {
  if (isWhitespace(context.char)) {
    return tagOpener;
  }

  if (isTagOpener(context.char) && !context.inTag) {
    context.inTag = true;
    return after(context, text);
  }

  throw new Error(invalidCharMessage(context));
};

export const text: State = function text(context) {
  if (
    isTagOpener(context.char) &&
    (context.tokenIsEmpty || !isEscape(context.prevChar))
  ) {
    return before(context, tagOpener);
  }

  return text;
};

export const value: State = function value(context) {
  if (
    isQuote(context.char) &&
    (context.tokenIsEmpty || !isEscape(context.prevChar))
  ) {
    return before(context, quote);
  }

  return value;
};
