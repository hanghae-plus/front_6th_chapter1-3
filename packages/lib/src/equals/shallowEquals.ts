import { isNullish, isArray, isObject, isSameValue } from "./utils";

// 배열 비교 함수
const compareArrays = (a: unknown[], b: unknown[]): boolean =>
  a.length === b.length && a.every((item, index) => item === b[index]);

// 객체 키 비교 함수
const hasSameKeys = (keysA: string[], keysB: string[]): boolean =>
  keysA.length === keysB.length && keysA.every((key) => keysB.includes(key));

// 객체 값 비교 함수
const compareObjectValues =
  (a: Record<string, unknown>, b: Record<string, unknown>) =>
  (keys: string[]): boolean =>
    keys.every((key) => a[key] === b[key]);

// 객체 비교 함수
const compareObjects = (a: Record<string, unknown>, b: Record<string, unknown>): boolean => {
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  return hasSameKeys(keysA, keysB) && compareObjectValues(a, b)(keysA);
};

// 메인 shallowEquals 함수
export const shallowEquals = (a: unknown, b: unknown): boolean => {
  // 기본 타입 비교
  if (isSameValue(a, b)) return true;

  // null/undefined 체크
  if (isNullish(a) || isNullish(b)) return a === b;

  // 타입이 다른 경우
  if (typeof a !== typeof b) return false;

  // 배열 비교
  if (isArray(a) && isArray(b)) return compareArrays(a, b);

  // 객체 비교
  if (isObject(a) && isObject(b)) return compareObjects(a, b);

  return false;
};
