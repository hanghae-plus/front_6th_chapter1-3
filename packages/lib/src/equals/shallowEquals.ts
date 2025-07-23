import { isObject } from "../utils/is";

export const shallowEquals = (a: unknown, b: unknown) => {
  if (a === b) return true;

  if (!isObject(a) || !isObject(b)) return false;

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) return false;

  for (const key of aKeys) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
    if (a[key] !== b[key]) return false;
  }

  return true;
};
