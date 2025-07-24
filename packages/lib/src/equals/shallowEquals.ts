/**
 * shallowEquals - 두 값의 얕은 비교를 수행합니다.
 *
 * 특징:
 * - 객체의 첫 번째 깊이 속성들만 비교 (중첩 객체는 참조 비교)
 * - Object.is()를 사용하여 정확한 값 비교
 * - React의 최적화에서 주로 사용되는 비교 방식
 *
 * @param a 비교할 첫 번째 값
 * @param b 비교할 두 번째 값
 * @returns 두 값이 얕게 동등하면 true, 아니면 false
 */

export const shallowEquals = (a: unknown, b: unknown): boolean => {
  if (Object.is(a, b)) {
    return true;
  }

  if (typeof a !== "object" || a === null || typeof b !== "object" || b === null) {
    return false;
  }

  const keysA = Object.keys(a as Record<string, unknown>);
  const keysB = Object.keys(b as Record<string, unknown>);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let i = 0; i < keysA.length; i++) {
    const currentKey = keysA[i];

    if (
      !Object.prototype.hasOwnProperty.call(b, currentKey) ||
      !Object.is((a as Record<string, unknown>)[currentKey], (b as Record<string, unknown>)[currentKey])
    ) {
      return false;
    }
  }

  return true;
};
