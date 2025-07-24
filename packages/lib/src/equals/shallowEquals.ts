export const shallowEquals = (a: unknown, b: unknown) => {
  // 기본 타입 값들을 정확히 비교
  if (a === b) return true;

  // a, b 하나라도 객체가 아닌 경우 false return
  if (a == null || b == null || typeof a !== "object" || typeof b !== "object") return false;

  // 객체가 string key로 접근 가능하다고 명시
  const objA = a as Record<string, unknown>;
  const objB = b as Record<string, unknown>;

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  // key 개수 비교
  if (keysA.length !== keysB.length) return false;

  // 반복문으로 얕은 비교
  for (const key of keysA) {
    if (!(key in b) || objA[key] !== objB[key]) return false;
  }
  return true;
};
