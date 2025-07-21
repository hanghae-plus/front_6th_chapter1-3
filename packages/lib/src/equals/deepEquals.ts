import { getObjectKeys, isArray, isObject, isPrimitive } from "./utils";

export const deepEquals = (a: unknown, b: unknown) => {
  if (typeof a !== typeof b) return false;

  if (isPrimitive(a) && isPrimitive(b)) {
    return a === b;
  }

  if (isArray(a) && isArray(b)) {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
      if (!deepEquals(a[i], b[i])) return false;
    }

    return true;
  }

  if (isObject(a) && isObject(b)) {
    const keysA = getObjectKeys(a);
    const keysB = getObjectKeys(b);

    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
      if (!deepEquals(a[key], b[key])) return false;
    }

    return true;
  }

  return a === b;
};
