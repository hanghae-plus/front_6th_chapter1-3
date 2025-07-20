import { isArray, isObject } from "../utils/typeCheck";

export const shallowEquals = (a: unknown, b: unknown) => {
  // https://github.com/JiHoon-0330/front_6th_chapter1-3/issues/1
  if (Object.is(a, b)) {
    return true;
  }

  if (a == null || b == null) {
    return false;
  }

  if (isArray(a) && isArray(b)) {
    return a.length === b.length && a.every((value, index) => value === b[index]);
  }

  if (isObject(a) && isObject(b)) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
      return false;
    }

    for (const key of keysA) {
      if (!Object.is(a[key], b[key])) {
        return false;
      }
    }

    return true;
  }

  return false;
};
