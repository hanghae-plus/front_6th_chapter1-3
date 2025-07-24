/**
 * 두 값의 얕은 비교를 수행합니다. (1단계 깊이만 비교)
 *
 * @param objA - 비교할 첫 번째 값 (모든 타입 허용)
 * @param objB - 비교할 두 번째 값 (모든 타입 허용)
 * @returns 두 값이 얕은 수준에서 동일하면 true, 다르면 false
 */
export function shallowEquals(objA: unknown, objB: unknown): boolean {
  // 1. 참조 동일성 체크
  if (objA === objB) return true;

  // 2. 타입 및 null 검증
  if (typeof objA !== typeof objB) return false;
  if (objA === null || objB === null) return false;
  if (typeof objA !== "object") return false;

  const recordA = objA as Record<string, unknown>;
  const recordB = objB as Record<string, unknown>;

  // 3. 키 개수 비교
  const keysA = Object.keys(recordA);
  if (keysA.length !== Object.keys(recordB).length) return false;

  // 4. 키별 얕은 비교
  for (const key of keysA) {
    if (!(key in recordB)) return false;
    if (recordA[key] !== recordB[key]) return false;
  }

  return true;
}
