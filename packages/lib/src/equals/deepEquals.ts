/**
 * 깊은 비교를 수행하는 함수
 * @param a 비교할 첫 번째 값
 * @param b 비교할 두 번째 값
 * @returns 두 값이 깊은 수준에서 동일하면 true, 그렇지 않으면 false를 반환
 */
export function deepEquals(a: unknown, b: unknown): boolean {
  if (a === b) return true;

  if (a == null || b == null || typeof a !== "object" || typeof b !== "object") {
    return false;
  }

  if (Array.isArray(a) !== Array.isArray(b)) {
    return false;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((v, i) => deepEquals(v, b[i]));
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  return keysA.every(
    (key) =>
      Object.prototype.hasOwnProperty.call(b, key) &&
      deepEquals((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key]),
  );
}
