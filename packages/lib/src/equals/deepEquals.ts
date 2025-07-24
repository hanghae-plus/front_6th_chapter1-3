import { hasOwn, isObject } from "../utils/objectUtils";

export function deepEquals<T>(a: T, b: T, depth: number = Infinity) {
  if (depth === 0) {
    return a === b;
  }

  if (isObject(a) && isObject(b)) {
    const aKeys = Object.getOwnPropertyNames(a);
    const bKeys = Object.getOwnPropertyNames(b);

    if (aKeys.length !== bKeys.length) {
      return false;
    }

    return aKeys.every((key): boolean => hasOwn(b, key) && deepEquals(a[key], b[key], depth - 1));
  }

  return a === b;
}
