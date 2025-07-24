// shallowEquals 함수는 두 값의 얕은 비교를 수행합니다.
export const shallowEquals = (objA: unknown, objB: unknown) => {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (Object.is(objA, objB)) return true;

  // 2. 둘 중 하나라도 객체가 아닌 경우 처리
  if (objA === null || objB === null) return false;

  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) return false;

    for (let i = 0; i < objA.length; i++) {
      if (!Object.is(objA[i], objB[i])) return false;
    }

    return true;
  }

  if (typeof objA === "object" && typeof objB === "object") {
    // 3. 객체의 키 개수가 다른 경우 처리
    const objAKeys = Object.keys(objA);
    const objBKeys = Object.keys(objB);

    if (objAKeys.length !== objBKeys.length) return false;

    // 4. 모든 키에 대해 얕은 비교 수행
    for (const key of objAKeys) {
      if (!Object.is((objA as Record<string, unknown>)[key], (objB as Record<string, unknown>)[key])) return false;
    }

    return true;
  }

  // 이 부분을 적절히 수정하세요.
  return false;
};
