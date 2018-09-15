export type Maybe<T> = T | undefined;

export type Dictionary<T, I extends keyof any = keyof any> = {
  [P in I]: T;
};

export function bindMethods<T>(o: T, ...methods: Array<keyof T>) {
  const prototype = Object.getPrototypeOf(o);
  if (methods.length === 0) {
    methods = Object.getOwnPropertyNames(prototype) as Array<keyof T>;
  }
  for (const method of methods) {
    if (typeof prototype[method] === 'function') {
      o[method] = prototype[method].bind(o);
    }
  }
}
