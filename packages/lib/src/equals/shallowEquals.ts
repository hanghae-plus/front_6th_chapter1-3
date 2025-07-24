// shallowEquals 함수는 두 값의 얕은 비교를 수행합니다.
export function shallowEquals(objA: unknown, objB: unknown): boolean {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (objA === objB) return true;

  // 2. 둘 중 하나라도 객체가 아닌 경우 처리
  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) return false;

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  // 3. 객체의 키 개수가 다른 경우 처리
  if (keysA.length !== keysB.length) return false;

  // 4. 모든 키에 대해 얕은 비교 수행
  for (const key of keysA) {
    if (!keysB.includes(key) || (objA as Record<string, unknown>)[key] !== (objB as Record<string, unknown>)[key]) {
      return false;
    }
  }

  // 모든 조건을 통과하면 얕은 비교가 같다고 판단
  return true;
}
