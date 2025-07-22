import { isObject } from "./util";

/**
 * 두 값의 얕은 비교 결과를 반환
 * @param {unknown} a 비교할 첫 번째 값
 * @param {unknown} b 비교할 두 번째 값
 * @returns {boolean} 두 값이 얕은 비교 결과
 */
export const shallowEquals = (a: unknown, b: unknown) => {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (a === b) return true;

  // 2. 둘 중 하나라도 객체가 아닌 경우 처리
  if (!isObject(a) || !isObject(b)) return false;

  // 3. 객체의 키 개수가 다른 경우 처리
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  // 4. 모든 키에 대해 얕은 비교 수행
  return keysA.every((key) => a[key] === b[key]);
};
