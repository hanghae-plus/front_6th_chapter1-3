// deepEquals 함수는 두 값의 깊은 비교를 수행합니다.
export function deepEquals(objA: any, objB: any): boolean {
  if (objA === objB) return true;

  // 1. 기본 타입이거나 null인 경우 처리
  if (typeof objA !== "object" || objA === null) return false;
  if (typeof objB !== "object" || objB === null) return false;

  // 2. 둘 다 객체인 경우:
  //    - 배열인지 확인
  const isArrayA = Array.isArray(objA);
  const isArrayB = Array.isArray(objB);

  if (isArrayA !== isArrayB) return false;

  //    - 재귀적으로 각 속성에 대해 deepEquals 호출
  if (isArrayA && isArrayB) {
    if (objA.length !== objB.length) return false;

    for (let i = 0; i < objA.length; i++) {
      if (!deepEquals(objA[i], objB[i])) return false;
    }
    return true;
  }
  //    - 객체의 키 개수가 다른 경우 처리
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  //    - 재귀적으로 각 속성에 대해 deepEquals 호출
  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i];
    if (!objB.hasOwnProperty(key) || !deepEquals(objA[key], objB[key])) {
      return false;
    }
  }

  return true;
}
