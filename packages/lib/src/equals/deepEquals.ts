// 기본 타입, 배열, 객체, 중첩 구조를 정확히 비교

export const deepEquals = (a: unknown, b: unknown) => {
  // 기본 타입
  if (a === b) return true;

  // 배열
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
      if (!deepEquals(a[i], b[i])) return false;
    }
    return true;
  }

  // 객체
  if (a != null && b != null && typeof a === "object" && typeof b === "object") {
    const aRecord = a as Record<string, unknown>;
    const bRecord = b as Record<string, unknown>;
    const aKeys = Object.keys(aRecord);
    const bKeys = Object.keys(bRecord);

    if (aKeys.length !== bKeys.length) return false;

    for (const key of aKeys) {
      if (!deepEquals(aRecord[key], bRecord[key])) return false;
    }

    return true;
  }

  return false;
};
