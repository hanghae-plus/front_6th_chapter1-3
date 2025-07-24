export const deepEquals = (a: unknown, b: unknown): boolean => {
  // null 체크
  if (a === null || b === null) return a === b;

  // 타입이 다르면 다름
  if (typeof a !== typeof b) return false;

  // 배열 비교
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((v, index) => deepEquals(v, b[index]));
  }

  // 객체 비교
  if (typeof a === "object") {
    const objA = a as Record<string, unknown>;
    const objB = b as Record<string, unknown>;
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) return false;
    return keysA.every((key) => deepEquals(objA[key], objB[key]));
  }

  return a === b;
};
