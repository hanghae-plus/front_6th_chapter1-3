import { isArray, isObject } from "../utils/typeGuard";

export const deepEquals = (a: unknown, b: unknown) => {
  // 타입이 변경되면 무조건 다르다고 판단
  if (typeof a !== typeof b) return false;

  // 배열 비교
  if (isArray(a) && isArray(b)) {
    if (a.length !== b.length) return false;

    // 배열 요소에 대한 깊은 비교
    for (let i = 0; i < a.length; i++) {
      if (!deepEquals(a[i], b[i])) return false;
    }

    return true;
  }

  // 객체 비교
  if (isObject(a) && isObject(b)) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    // 객체 요소에 대한 깊은 비교
    for (let i = 0; i < keysA.length; i++) {
      const key = keysA[i];
      if (!deepEquals(a[key], b[key])) return false;
    }

    return true;
  }

  // 기본 타입 비교
  return a === b;
};
