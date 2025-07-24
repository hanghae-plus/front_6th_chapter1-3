/**
 * 두 값이 깊은 비교에서 동일한지 확인하는 함수
 * @param a 첫 번째 값
 * @param b 두 번째 값
 * @returns 두 값이 동일하면 true, 그렇지 않으면 false
 */
export const deepEquals = (a: unknown, b: unknown): boolean => {
  // 1. 기본 타입 비교 (원시 타입, null, undefined)
  if (a === b) return true;
  if (a == null || b == null) return a === b;
  if (typeof a !== "object" || typeof b !== "object") return a === b;

  // 2. 배열 타입 확인
  const aIsArray = Array.isArray(a);
  const bIsArray = Array.isArray(b);
  if (aIsArray !== bIsArray) return false;

  // 3. 객체 키 비교
  const aKeys = Object.keys(a as Record<string, unknown>);
  const bKeys = Object.keys(b as Record<string, unknown>);

  if (aKeys.length !== bKeys.length) return false;

  // 4. 모든 속성에 대해 재귀적으로 비교
  return aKeys.every((key) => {
    if (!bKeys.includes(key)) return false;

    const aValue = (a as Record<string, unknown>)[key];
    const bValue = (b as Record<string, unknown>)[key];

    return deepEquals(aValue, bValue);
  });
};
