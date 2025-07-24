export const deepEquals = (a: unknown, b: unknown) => {
  // === 가 아닌 Object.is() 사용
  if (Object.is(a, b)) {
    return true;
  }
  const isNull = a === null || b === null;
  const isNotObject = typeof a !== "object" || typeof b !== "object";
  // 둘 중에 하나라도 null 또는 object 타입이 아닐 경우
  if (isNull || isNotObject) {
    return false;
  }
  // 서로 다른 참조를 가진 객체 또는 배열
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  /* 배열 얕게 비교 */
  if (aKeys.length !== bKeys.length) {
    return false;
  }
  /* 중첩된 구조 깊게 비교를 위한 a, b 를 인덱싱 가능한 타입으로 간주하도록 설정 */
  const objA = a as Record<string, unknown>;
  const objB = b as Record<string, unknown>;

  for (const key of aKeys) {
    // 깊은 비교를 위하여 재귀 호출
    if (!Object.hasOwn(b, key) || !deepEquals(objA[key], objB[key])) {
      return false;
    }
  }
  return true;
};
