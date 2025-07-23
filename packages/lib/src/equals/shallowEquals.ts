import { isObject } from "./utils";

export const shallowEquals = (a: unknown, b: unknown) => {
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }

    return a.every((el, index) => el === b[index]);
  }

  if (isObject(a) && isObject(b)) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) {
      return false;
    }

    return aKeys.every((key) => a[key] === b[key]);
  }

  return a === b;
};
