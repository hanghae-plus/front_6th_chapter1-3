import { isNullish, isArray, isObject, isSameValue } from "./utils";

export const deepEquals = (a: unknown, b: unknown): boolean => {
  // 기본 타입 비교
  if (isSameValue(a, b)) return true;

  // null/undefined 체크
  if (isNullish(a) || isNullish(b)) return a === b;

  // 타입이 다른 경우
  if (typeof a !== typeof b) return false;

  // 배열 비교
  if (isArray(a) && isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEquals(a[i], b[i])) return false;
    }
    return true;
  }

  // 객체 비교
  if (isObject(a) && isObject(b)) {
    const keysA = Object.keys(a as Record<string, unknown>);
    const keysB = Object.keys(b as Record<string, unknown>);

    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
      if (!keysB.includes(key)) return false;
      if (!deepEquals((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])) return false;
    }

    return true;
  }

  return false;
};
