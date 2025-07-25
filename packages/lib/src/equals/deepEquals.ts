// deepEquals 함수는 두 값의 깊은 비교를 수행합니다.
export function deepEquals(objA: any, objB: any): boolean {
  if (objA === objB) {
    return true; // 동일한 참조를 가진 경우
  }
  // 1. 기본 타입이거나 null인 경우 처리
  if (typeof objA !== "object" || typeof objB !== "object" || objA === null || objB === null) {
    return false;
  }
  // 2. 둘 다 객체인 경우:
  //    - 배열인지 확인
  //    - 객체의 키 개수가 다른 경우 처리
  //    - 재귀적으로 각 속성에 대해 deepEquals 호출

  // 이 부분을 적절히 수정하세요.
  if (typeof objA === "object" && typeof objB === "object") {
    if (Array.isArray(objA) !== Array.isArray(objB)) {
      return false;
    }
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) {
      return false;
    }
    for (const key of keysA) {
      if (!keysB.includes(key) || !deepEquals(objA[key], objB[key])) {
        return false;
      }
    }
    return true;
  }
  return true;
}
