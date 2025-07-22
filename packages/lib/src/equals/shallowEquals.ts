export const shallowEquals = (a: unknown, b: unknown) => {
  // 1. 참조가 같으면 즉시 true 반환 (성능 최적화)
  if (a === b) return true;

  // 2. null이나 undefined인 경우 (이미 === 체크에서 처리되지만 명시적으로 처리)
  if (a == null || b == null) return false;

  // 3. 타입이 다르면 false
  if (typeof a !== typeof b) return false;

  // 4. 배열인지 확인
  if (Array.isArray(a) && Array.isArray(b)) {
    // 길이가 다르면 false
    if (a.length !== b.length) return false;

    // 각 요소를 얕게 비교
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  // 5. 객체인지 확인
  if (typeof a === "object" && typeof b === "object") {
    const objA = a as Record<string, unknown>;
    const objB = b as Record<string, unknown>;
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    // 키의 개수가 다르면 false
    if (keysA.length !== keysB.length) return false;

    // 각 키의 값을 얕게 비교
    for (const key of keysA) {
      if (objA[key] !== objB[key]) {
        return false;
      }
    }
    return true;
  }

  // 6. 기본 타입이면 false
  return false;
};
