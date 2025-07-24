export const deepEquals = (a: unknown, b: unknown) => {
  // 기본 타입 값들을 정확히 비교
  if (a === b) return true;

  // a, b 하나라도 객체가 아닌 경우 false return
  if (a == null || b == null || typeof a !== "object" || typeof b !== "object") return false;

  // 객체가 string key로 접근 가능하다고 명시
  const objA = a as Record<string, unknown>;
  const objB = b as Record<string, unknown>;

  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) return false;

    for (let i = 0; i < objA.length; i++) {
      if (!deepEquals(objA[i], objB[i])) return false;
    }
    return true;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (let i = 0; i < keysA.length; i++) {
    if (!Object.hasOwn(objB, keysA[i])) {
      return false;
    }
    // 각 key에 매칭되는 값이 같은지 체크
    if (!deepEquals(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }
  return true;
};
