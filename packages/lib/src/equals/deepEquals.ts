import { isArray, isObject } from "../utils/typeCheck";

export const deepEquals = (a: unknown, b: unknown): boolean => {
  if (Object.is(a, b)) {
    return true;
  }

  if (a == null || b == null) {
    return false;
  }

  if (isArray(a) && isArray(b)) {
    return a.length === b.length && a.every((value, index) => deepEquals(value, b[index]));
  }

  if (isObject(a) && isObject(b)) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
      return false;
    }

    for (const key of keysA) {
      if (!deepEquals(a[key], b[key])) {
        return false;
      }
    }

    return true;
  }

  return a === b;
};
