export const deepEquals = (a: unknown, b: unknown): boolean => {
  if (a === b) return true;

  // null 검사 + 타입 비교
  if (typeof a !== typeof b || a === null || b === null) return false;

  // 배열 비교
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((val, i) => deepEquals(val, b[i])); // 재귀 (DFS)
  }

  // 객체 비교
  if (typeof a === "object" && typeof b === "object") {
    const aObj = a as Record<string, unknown>;
    const bObj = b as Record<string, unknown>;
    const aKeys = Object.keys(aObj);
    const bKeys = Object.keys(bObj);
    if (aKeys.length !== bKeys.length) return false;

    return aKeys.every(
      (key) => Object.prototype.hasOwnProperty.call(bObj, key) && deepEquals(aObj[key], bObj[key]), // 재귀 (DFS)
    );
  }

  // 그 외 값은 ===
  return false;
};
