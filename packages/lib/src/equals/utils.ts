export type Primitive = string | number | boolean | null | undefined | bigint | symbol;

export const isArray = (value: unknown): value is unknown[] => Array.isArray(value);

export const isObject = (value: unknown): value is object => typeof value === "object" && value !== null;

export const isPrimitive = (value: unknown): value is Primitive => typeof value !== "object" || value === null;

export const getObjectKeys = <T extends object>(o: T): (keyof T)[] => Object.keys(o) as (keyof T)[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isFunction(value: any): value is (...args: any[]) => any {
  return typeof value === "function";
}
