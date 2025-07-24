// deepEquals 함수는 두 값의 깊은 비교를 수행합니다.
export function deepEquals(objA: unknown, objB: unknown): boolean {
  if (objA === objB) return true;

  // 1. 기본 타입이거나 null인 경우 처리
  if (objA == null || objB == null || typeof objA !== "object" || typeof objB !== "object") return false;

  // 2. 둘 다 객체인 경우:
  //    - 배열인지 확인
  //    - 객체의 키 개수가 다른 경우 처리
  //    - 재귀적으로 각 속성에 대해 deepEquals 호출

  // 객체/배열 비교를 한 번에 처리 해서 하나의 조건에서 처리
  if (typeof objA === "object" && typeof objB === "object") {
    if (Array.isArray(objA) !== Array.isArray(objB)) return false;

    // 객체의 키를 가져와서 비교
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
      const aVal = (objA as Record<string, unknown>)[key];
      const bVal = (objB as Record<string, unknown>)[key];
      if (!keysB.includes(key)) return false;
      if (!deepEquals(aVal, bVal)) return false;
    }

    // keysB에 있는 모든 키가 keysA에도 있는지도 확인
    for (const key of keysB) {
      if (!keysA.includes(key)) return false;
    }
    return true;
  }
  return false;
}
