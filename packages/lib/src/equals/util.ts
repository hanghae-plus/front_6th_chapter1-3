/**
 * 주어진 값이 객체인지 확인하는 함수
 * @reference https://github.com/toss/es-toolkit/blob/main/src/compat/predicate/isObject.ts
 * @param {unknown} value - 객체인지 확인할 값
 * @returns {value is Record<string, unknown>} 객체인지 확인 결과
 */
export function isObject(value?: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object";
}

/**
 * 두 객체를 비교하는 함수
 * @param a 비교할 첫 번째 객체
 * @param b 비교할 두 번째 객체
 * @returns 두 객체가 같은지 확인 결과
 */
export function compareObject(
  a: Record<string, unknown>,
  b: Record<string, unknown>,
  compareFn: (a: unknown, b: unknown) => boolean = (a, b) => a === b,
): boolean {
  // 객체의 키 개수가 다른 경우 처리
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  // 모든 키에 대해 비교 수행
  return keysA.every((key) => compareFn(a[key], b[key]));
}
