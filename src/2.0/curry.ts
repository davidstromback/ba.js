interface Curried2<T1, T2, R> {
  (): Curried2<T1, T2, R>;
  (a: T1): (b: T2) => R;
  (a: T1, b: T2): R;
}

interface Curried3<T1, T2, T3, R> {
  (): Curried3<T1, T2, T3, R>;
  (a: T1): Curried2<T2, T3, R>;
  (a: T1, b: T2): (c: T3) => R;
  (a: T1, b: T2, c: T3): R;
}

interface Curried4<T1, T2, T3, T4, R> {
  (): Curried4<T1, T2, T3, T4, R>;
  (a: T1): Curried3<T1, T2, T3, R>;
  (a: T1, b: T2): Curried2<T3, T4, R>;
  (a: T1, b: T2, c: T3): (d: T4) => R;
  (a: T1, b: T2, c: T3, d: T4): R;
}

function curry2<T1, T2, R>(fn: (a: T1, b: T2) => R) {
  function curried(a: T1): (b: T2) => R;
  function curried(a: T1, b: T2): R;
  function curried(...args: any[]) {
    switch (args.length) {
      case 0:
        return curried;
      case 1:
        return (b: T2) => fn(args[0], b);
      default:
        return fn(args[0], args[1]);
    }
  }

  return curried;
}

function curry3<T1, T2, T3, R>(fn: (a: T1, b: T2, c: T3) => R) {
  function curried(a: T1): (b: T2) => R;
  function curried(a: T1, b: T2): R;
  function curried(...args: any[]) {
    switch (args.length) {
      case 0:
        return curried;
      case 1:
        return (b: T2) => fn(args[0], b);
      default:
        return fn(args[0], args[1]);
    }
  }

  return curried;
}

const add = (a: number, b: number) => a + b;

const curriedAdd = curry2(add);

const a = curriedAdd(2, 2);
