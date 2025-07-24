export const deepEquals = (a: unknown, b: unknown): boolean => {
  // 배열 비교
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((v, index) => deepEquals(v, b[index]));
  }

  // 객체 비교
  if (typeof a === "object" && typeof b === "object" && a !== null && b !== null) {
    const objA = a as Record<string, unknown>;
    const objB = b as Record<string, unknown>;
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) return false;
    return keysA.every((key) => deepEquals(objA[key], objB[key]));
  }

  return a === b;
};
