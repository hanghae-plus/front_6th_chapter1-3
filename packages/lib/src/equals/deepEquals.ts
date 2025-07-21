import { getObjectKeys, isArray, isObject, isPrimitive } from "./utils";

const comparePrimitive = (a: unknown, b: unknown) => Object.is(a, b);

export const deepEquals = (a: unknown, b: unknown): boolean => {
  if (isPrimitive(a) && isPrimitive(b)) {
    return comparePrimitive(a, b);
  }

  if (isArray(a) && isArray(b)) {
    return a.length === b.length && a.every((item, index) => deepEquals(item, b[index]));
  }

  if (isObject(a) && isObject(b)) {
    const keysA = getObjectKeys(a);
    const keysB = getObjectKeys(b);

    return keysA.length === keysB.length && keysA.every((key) => deepEquals(a[key], b[key]));
  }

  return a === b;
};
