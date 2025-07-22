// deepEquals 함수는 두 값의 깊은 비교를 수행합니다.
export function deepEquals(objA: unknown, objB: unknown): boolean {
  // 요구사항
  // 1. 기본 타입이거나 null인 경우 처리
  if (Object.is(objA, objB)) return true;
  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) return false;

  // 2. 둘 다 객체인 경우:
  //    - 배열인지 확인
  //    - 재귀적으로 각 속성에 대해 deepEquals
  const isArrayA = Array.isArray(objA);
  const isArrayB = Array.isArray(objB);

  if (isArrayA !== isArrayB) return false;
  if (isArrayA && isArrayB) {
    if (objA.length !== objB.length) return false;
    for (let i = 0; i < objA.length; i++) {
      if (!deepEquals(objA[i], objB[i])) return false;
    }

    return true;
  }

  //    - 객체의 키 개수가 다른 경우 처리
  const keysA = Object.keys(objA as Record<string, unknown>);
  const keysB = Object.keys(objB as Record<string, unknown>);

  if (keysA.length !== keysB.length) return false;

  for (let i = 0; i < keysA.length; i++) {
    const currentKey = keysA[i];
    if (!Object.prototype.hasOwnProperty.call(objB, currentKey)) return false;

    if (!deepEquals((objA as Record<string, unknown>)[currentKey], (objB as Record<string, unknown>)[currentKey]))
      return false;
  }

  return true;

  // 테스트 조건
  // 기본 타입 값들을 정확히 비교해야 한다
  // 배열을 정확히 비교해야 한다
  // 객체를 정확히 비교해야 한다
  // 중첩된 구조를 정확히 비교해야 한다"
}
