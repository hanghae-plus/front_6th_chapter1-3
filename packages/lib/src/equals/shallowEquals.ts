export const shallowEquals = (a: unknown, b: unknown) => {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (a === b) {
    return true;
  }

  // 2. 둘 중 하나라도 객체가 아닌 경우 처리
  if (typeof a !== "object" || a === null || typeof b !== "object" || b === null) {
    return false;
  }

  // 3. 객체의 키 개수가 다른 경우 처리
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }

  // 4. 모든 키에 대해 얕은 비교 수행
  return Object.keys(a).every((key) => (a as any)[key] === (b as any)[key]);
};
