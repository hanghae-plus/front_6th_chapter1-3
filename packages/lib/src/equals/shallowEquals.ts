// shallowEquals 함수는 두 값의 얕은 비교를 수행합니다.
export function shallowEquals(objA: unknown, objB: unknown): boolean {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  // 2. 둘 중 하나라도 객체가 아닌 경우 처리
  // 3. 객체의 키 개수가 다른 ㅋ경우 처리
  // 4. 모든 키에 대해 얕은 비교 수행

  // 이 부분을 적절히 수정하세요.
  if (objA === objB) return true;

  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) return objA === objB;

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    const valueA = (objA as Record<string, unknown>)[key];
    const valueB = (objB as Record<string, unknown>)[key];

    if (!keysB.includes(key) || valueA !== valueB) {
      return false;
    }
  }

  return true;
}
