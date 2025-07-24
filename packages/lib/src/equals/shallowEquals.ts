/**
 * 얕은 비교를 수행하는 함수
 * @param a 비교할 첫 번째 값
 * @param b 비교할 두 번째 값
 * @returns 두 값이 얕은 수준에서 동일하면 true, 그렇지 않으면 false를 반환
 */
export function shallowEquals<T>(a: T, b: T): boolean {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (a === b) {
    return true;
  }
  // 2. 둘 중 하나라도 객체가 아닌 경우 처리
  if (a == null || b == null || typeof a !== "object" || typeof b !== "object") {
    return false;
  }
  // 3. 객체의 키 개수가 다른 경우 처리
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // 4. 모든 키에 대해 얕은 비교 수행
  for (const key of keysA) {
    if (
      !Object.prototype.hasOwnProperty.call(b, key) ||
      !Object.is((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])
    ) {
      return false;
    }
  }

  return true;
}
