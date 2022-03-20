export interface State {
  (context: TokenizeContext): State;
}

export interface Matcher {
  (char: number): boolean;
}

export interface Point {
  line: number;
  col: number;
  offset: number;
}

export interface Position {
  from: Point;
  to: Point;
}

export interface Token {
  type: string;
  position: Position;
  next?: Token;
  prev?: Token;
}

export interface TokenizeContext {
  location: Point;
  state: State;
  char: number;
  prevToken: Token | undefined;
  prevChar: number;
  tokenStart: Point;
  tokenIsEmpty: boolean;
  tokenHasNonWhitespaceChars: boolean;
  inTag: boolean;
  inValue: boolean;
  didCommit: boolean;
}
