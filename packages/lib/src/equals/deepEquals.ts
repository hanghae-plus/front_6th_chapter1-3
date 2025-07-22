import { isObject } from "../utils/type-guard";

/**
 * 깊은 비교를 통해 두 값이 같은지 비교하는 함수
 * @param a 비교할 값 1
 * @param b 비교할 값 2
 * @returns 깊은 비교 결과 (같으면 true, 다르면 false)
 */
export const deepEquals = (a: unknown, b: unknown): boolean => {
  if (isObject(a) && isObject(b)) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) return false;

    const uniqueKeys = new Set([...aKeys, ...bKeys]);

    for (const key of uniqueKeys) {
      if (isObject(a[key]) && isObject(b[key])) {
        return deepEquals(a[key], b[key]);
      }

      if (a[key] !== b[key]) return false;
    }

    return true;
  }

  return a === b;
};
