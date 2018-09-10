export type Maybe<T> = T | undefined;

export type Dictionary<T, I extends keyof any = keyof any> = {
  [P in I]: T;
};
