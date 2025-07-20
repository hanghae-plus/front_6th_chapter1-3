import { isFalsy } from "../utils/isFalsy";
import type { EqualPredicateFunction } from "./type";

/**
 * @description 두 값의 얕은 비교를 수행합니다. 객체의 참조가 다르더라도 값이 같으면 true를 반환합니다.
 */
export const shallowEquals: EqualPredicateFunction = (a: unknown, b: unknown): boolean => {
  // 1. 같은 참조이면 true
  if (a === b) {
    return true;
  }

  // 2. 둘 중 하나라도 null이거나 undefined이면 false
  if (isFalsy(a) || isFalsy(b)) {
    return false;
  }

  // 3. 둘 중 하나라도 객체가 아니면 false (이미 === 체크를 통과했으므로)
  if (typeof a !== "object" || typeof b !== "object") {
    return false;
  }

  // 4. 배열인지 확인
  const isArrayA = Array.isArray(a);
  const isArrayB = Array.isArray(b);

  // 5. 하나는 배열이고 하나는 배열이 아니면 false
  if (isArrayA !== isArrayB) {
    return false;
  }

  // 6. 둘 다 배열인 경우
  if (isArrayA && isArrayB) {
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }

  // 7. 둘 다 객체인 경우
  const keysA = Object.keys(a as Record<string, unknown>);
  const keysB = Object.keys(b as Record<string, unknown>);

  // 8. 키의 개수가 다르면 false
  if (keysA.length !== keysB.length) {
    return false;
  }

  // 9. 각 키에 대해 값을 얕게 비교
  const objA = a as Record<string, unknown>;
  const objB = b as Record<string, unknown>;

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objB, key)) {
      return false;
    }
    if (objA[key] !== objB[key]) {
      return false;
    }
  }

  return true;
};
