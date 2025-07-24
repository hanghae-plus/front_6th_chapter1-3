import { isPlainObject } from "../utils/typeChecker";

export const deepEquals = (a: unknown, b: unknown) => {
  // 원시 데이터 타입 비교
  if (Object.is(a, b)) return true;

  // 배열 비교
  if (Array.isArray(a) && Array.isArray(b)) {
    // 길이가 다르면 false
    if (a.length !== b.length) return false;
    // 요소를 하나씩 비교
    for (let i = 0; i < a.length; i++) {
      // 요소가 다르면 false
      if (!deepEquals(a[i], b[i])) return false;
    }
    return true;
  }

  // 객체 비교
  if (isPlainObject(a) && isPlainObject(b)) {
    // 객체 키의 개수가 다르면 false
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    // 객체 키를 하나씩 비교
    for (let i = 0; i < aKeys.length; i++) {
      const currentKey = aKeys[i];
      // 객체 키가 다르면 false
      if (!deepEquals(a[currentKey], b[currentKey])) return false;
    }
    return true;
  }

  // 객체 비교
  return false;
};
