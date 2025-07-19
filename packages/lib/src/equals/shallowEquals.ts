// 같은 값이면 true, 다른 값이면 false를 반환하는 함수
export const shallowEquals = (a: unknown, b: unknown) => {
  if (a === b) return true; // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)

  if (typeof a !== typeof b) {
    // 타입이 다르면 false
    return false;
  }
  if (typeof a !== "object" || typeof b !== "object") {
    // 2. 객체가 아닌 경우 처리
    return false;
  }
  if (a === null || b === null || a === undefined || b === undefined) {
    return false;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length != b.length) {
      return false;
    } else {
      return a.every((item, index) => item === b[index]);
      // return a.every((item, index) => shallowEquals(item, b[index])); // 이건 깊은비교임!!
    }
  }
  if (Object.keys(a).length !== Object.keys(b).length) {
    // 3. 객체의 키 개수가 다른 경우 처리
    return false;
  }
  // 4. 모든 키에 대해 얕은 비교 수행 (Record<string, any>로 타입 캐스팅 후 비교
  return Object.keys(a).every((key) => (a as Record<string, unknown>)[key] === (b as Record<string, unknown>)[key]);
};
