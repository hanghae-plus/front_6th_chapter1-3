export const deepEquals = (a: unknown, b: unknown) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== typeof b) return false;

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;

    // 1. 각 요소를 재귀적으로 비교
    for (let i = 0; i < a.length; i++) {
      if (!deepEquals(a[i], b[i])) return false;
    }
    return true;
  }

  if (typeof a === "object" && typeof b === "object") {
    const objA = a as Record<string, unknown>;
    const objB = b as Record<string, unknown>;
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) return false;

    // 2. 각 키의 값을 재귀적으로 비교
    for (const key of keysA) {
      if (!deepEquals(objA[key], objB[key])) return false;
    }
    return true;
  }

  return false;
};
