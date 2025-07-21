export const deepEquals = (a: unknown, b: unknown): boolean => {
  // 참조가 같으면 true
  if (a === b) return true;

  // null 또는 undefined 체크
  if (a == null || b == null) return false;

  // 타입이 다르면 false
  if (typeof a !== typeof b) return false;

  // 객체가 아닌 경우 값 비교
  if (typeof a !== "object") return a === b;

  // 배열인 경우
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((item, index) => deepEquals(item, b[index]));
  }

  const objA = a as { [key: string]: unknown };
  const objB = b as { [key: string]: unknown };

  // 객체의 키 개수가 다르면 false
  const keys1 = Object.keys(objA);
  const keys2 = Object.keys(objB);
  if (keys1.length !== keys2.length) return false;

  // 모든 프로퍼티를 전부 비교할 때까지 재귀적으로 비교
  return keys1.every((key) => deepEquals(objA[key], objB[key]));
};
