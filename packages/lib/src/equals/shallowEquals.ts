// 기본 타입 (string, boolean, number) 비교
// 배열을 얕게 비교 - 다른 객체 참조 시 false, 값이 같으면 true
// 객체 얕게 비교 - 다른 객체 참조 시 false, 값이 같으면 true
// 중첩된 구조 깊이 비교 X - 다른 객체 참조 시 false

export const shallowEquals = (a: unknown, b: unknown) => {
  // 기본 타입
  if (a === b) return true;

  // 배열
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
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
      if (aRecord[key] !== bRecord[key]) return false;
    }

    return true;
  }

  return false;
};
