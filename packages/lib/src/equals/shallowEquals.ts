import { isObject, isSame } from "../utils";
import { type ObjectType } from "../types";
import { compareObjectProperties } from "../utils/compareObjectProperties";

export const shallowEquals = (a: unknown, b: unknown): boolean => {
  if (isSame(a, b)) return true;
  if (!isObject(a) || !isObject(b)) return false;

  return compareObjectProperties(a as ObjectType, b as ObjectType, (a, b) => a === b);
};
