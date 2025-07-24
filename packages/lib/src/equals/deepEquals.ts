import { isObject, isSame } from "../utils";
import { type ObjectType } from "../types";
import { compareObjectProperties } from "../utils/compareObjectProperties";

export const deepEquals = (a: unknown, b: unknown): boolean => {
  if (isSame(a, b)) return true;
  if (!isObject(a) || !isObject(b)) return false;

  // 깊은 비교
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;

    return a.every((value, index) => deepEquals(value, b[index]));
  }

  return compareObjectProperties(a as ObjectType, b as ObjectType, (a, b) => deepEquals(a, b));
};
