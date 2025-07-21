export function deepEquals(objA: unknown, objB: unknown): boolean {
  // 1. 기본 타입인 경우
  if (typeof objA !== "object" || typeof objB !== "object") {
    return objA === objB;
  }

  // null 인 경우
  if (objA === null || objB === null) {
    return objA === objB;
  }

  // 둘다 객체인 경우
  // 배열인지 확인
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) return false;
    for (let i = 0; i < objA.length; i++) {
      if (!deepEquals(objA[i], objB[i])) return false;
    }
    return true;
  }

  // 객체의 키 개수가 다른 경우
  const aKeys = Object.keys(objA);
  const bKeys = Object.keys(objB);
  if (aKeys.length !== bKeys.length) return false;

  // 재귀적으로 각 속성에 대해 deepEquals 호출
  for (const key of aKeys) {
    if (!deepEquals((objA as Record<string, unknown>)[key], (objB as Record<string, unknown>)[key])) return false;
  }
  return true;
}
