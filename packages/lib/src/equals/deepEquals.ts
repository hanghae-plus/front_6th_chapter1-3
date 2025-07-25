import { compareObject, isObject } from "./util";

/**
 * 두 값의 깊은 비교 결과를 반환
 * @param {unknown} a 비교할 첫 번째 값
 * @param {unknown} b 비교할 두 번째 값
 * @returns {boolean} 두 값의 깊은 비교 결과
 */
export const deepEquals = (a: unknown, b: unknown): boolean => {
  // 1. 기본 타입이거나 null인 경우 처리
  if (a === b) return true;

  // 2. 둘 다 객체인 경우:
  //    - 배열인지 확인
  //    - 객체의 키 개수가 다른 경우 처리
  //    - 재귀적으로 각 속성에 대해 deepEquals 호출
  if (!isObject(a) || !isObject(b)) return false;

  return compareObject(a, b, deepEquals);
};
