export const shallowEquals = (a: unknown, b: unknown) => {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (a === b) return true;

  // 2. 둘 중 하나라도 객체가 아닌 경우 처리
  if (typeof a !== "object" || typeof b !== "object") {
    return false;
  }

  // null cjfl
  if (a === null || b === null) return a === b;

  // 3. 객체의 키 개수가 다른 경우 처리
  // 여기 도착하면 a,b는 object 타입이고 null이 아님
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;

  // 4. 모든 키에 대해 얕은 비교 수행
  for (const key of aKeys) {
    if ((a as Record<string, unknown>)[key] !== (b as Record<string, unknown>)[key]) {
      return false;
    }
  }
  return true;
};
