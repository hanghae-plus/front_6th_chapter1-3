export const deepEquals = (a: unknown, b: unknown): boolean => {
  if (a === b) return true;

  // null 처리
  if (a == null || b == null) return false;

  // 타입 다르면 다름
  if (typeof a !== typeof b) return false;

  // 배열
  if (Array.isArray(a) && Array.isArray(b)) {
    // 길이 다르면 다름
    if (a.length !== b.length) return false;
    // 각 요소 비교
    return a.every((item, index) => deepEquals(item, b[index]));
  }

  // 객체
  if (typeof a === "object" && typeof b === "object") {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    // 키 개수 다르면 다름
    if (aKeys.length !== bKeys.length) return false;

    // 각 키의 값 비교
    return aKeys.every(
      (key) => Object.hasOwn(b, key) && deepEquals(a[key as keyof typeof a], b[key as keyof typeof b]),
    );
  }

  // 나머지는 === 로 비교
  return false;
};
