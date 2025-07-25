export const deepEquals = (a: unknown, b: unknown): boolean => {
  // 1. 기본 타입이거나 null인 경우 처리
  if (a === null || b === null || typeof a !== "object" || typeof b !== "object") {
    return a === b;
  }

  // 2. 둘 다 객체인 경우:
  //    - 배열인지 확인
  if (Array.isArray(a) && Array.isArray(b)) {
    // 배열의 길이가 다르면 false
    if (a.length !== b.length) return false;
    // 각 요소를 재귀적으로 비교
    return a.every((item, index) => deepEquals(item, b[index]));
  }
  //    - 객체의 키 개수가 다른 경우 처리
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  //    - 재귀적으로 각 속성에 대해 deepEquals 호출
  for (const key of keysA) {
    if (!keysB.includes(key) || !deepEquals((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])) {
      return false;
    }
  }

  return true;
};
