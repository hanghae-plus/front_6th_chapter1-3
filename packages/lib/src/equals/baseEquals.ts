import { isNullish, isPrimitive, isArray, isObject, isSameType } from "../utils";

type ComparisonCallback = (a: unknown, b: unknown) => boolean;

export const baseEquals = (a: unknown, b: unknown, compareValues: ComparisonCallback): boolean => {
  if (a === b) return true;
  if (isNullish(a) || isNullish(b)) return false;
  if (isPrimitive(a) || isPrimitive(b)) return false;
  if (!isSameType(a, b)) return false;

  if (isArray(a) && isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!compareValues(a[i], b[i])) return false;
    }
    return true;
  }

  if (isObject(a) && isObject(b)) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
      if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
      if (!compareValues(a[key], b[key])) return false;
    }
    return true;
  }

  return false;
};
