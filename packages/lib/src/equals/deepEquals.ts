export const deepEquals = (a: unknown, b: unknown): boolean => {
  if (a === b) return true; // 1. 두 값 참조가 같은 경우

  if (typeof a !== typeof b) return false;

  if (typeof a !== "object" || typeof b !== "object") return false;

  if (a === null || b === null) return false;

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length != b.length) {
      return false;
    } else {
      return a.every((item, index) => deepEquals(item, b[index])); // 깊은비교
    }
  }
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  } else {
    // 4. 모든 값에 대한 비교(Record<string, unknown>로 타입 캐스팅 후 재귀적으로 비교
    return Object.keys(a).every((key) =>
      deepEquals((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key]),
    );
  }
};
