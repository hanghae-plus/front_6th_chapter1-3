export type StringRecord = Record<string, string>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction = (...args: any[]) => any;

export type Selector<T, S = T> = (state: T) => S;

export const Types = {
  NUMBER: "number",
  STRING: "string",
  BOOLEAN: "boolean",
  SYMBOL: "symbol",
  BIGINT: "bigint",
  NULL: "null",
  UNDEFINED: "undefined",
  ARRAY: "array",
  OBJECT: "object",
} as const;
