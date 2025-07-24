/**
 * deepEquals - 두 값의 깊은 비교를 수행합니다.
 *
 * 특징:
 * - 중첩된 객체와 배열의 모든 속성을 재귀적으로 비교
 * - 기본 타입, null, undefined 처리
 * - 배열과 객체의 구조적 동등성 검사
 *
 * @param a 비교할 첫 번째 값
 * @param b 비교할 두 번째 값
 * @returns 두 값이 깊게 동등하면 true, 아니면 false
 */

export const deepEquals = (a: unknown, b: unknown) => {
  if (a === b) return true;

  if (a === null || b === null) return false;

  if (typeof a !== "object" || typeof b !== "object") return false;

  const isArrayA = Array.isArray(a);
  const isArrayB = Array.isArray(b);

  if (isArrayA !== isArrayB) return false;
  if (isArrayA && isArrayB) {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
      if (!deepEquals(a[i], b[i])) return false;
    }

    return true;
  }

  const keysA = Object.keys(a as Record<string, unknown>);
  const keysB = Object.keys(b as Record<string, unknown>);

  if (keysA.length !== keysB.length) return false;

  for (let i = 0; i < keysA.length; i++) {
    const currentKey = keysA[i];

    if (!Object.prototype.hasOwnProperty.call(b, currentKey)) return false;

    if (!deepEquals((a as Record<string, unknown>)[currentKey], (b as Record<string, unknown>)[currentKey]))
      return false;
  }

  return true;
};
