// deepEquals 함수는 두 값의 깊은 비교를 수행합니다.
export const deepEquals = (objA: unknown, objB: unknown) => {
  // 1. 기본 타입이거나 null인 경우 처리
  if (typeof objA !== "object" || typeof objB !== "object" || objA === null || objB === null) {
    return objA === objB;
  }

  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) return false;

    for (let i = 0; i < objA.length; i++) {
      if (objA[i] !== objB[i]) {
        if (!deepEquals(objA[i], objB[i])) return false;
      }
    }
    return true;
  }

  // 2. 둘 다 객체인 경우:
  //    - 배열인지 확인
  //    - 객체의 키 개수가 다른 경우 처리
  //    - 재귀적으로 각 속성에 대해 deepEquals 호출

  const objAKeys = Object.keys(objA);
  const objBKeys = Object.keys(objB);

  if (objAKeys.length !== objBKeys.length) return false;

  for (let i = 0; i < objAKeys.length; i++) {
    const objKey = objAKeys[i];

    if (!Object.hasOwn(objB, objKey)) {
      return false;
    }

    const objAValue = (objA as Record<string, unknown>)[objKey];
    const objBValue = (objB as Record<string, unknown>)[objKey];

    if (!Object.is(objAValue, objBValue)) {
      if (!deepEquals(objAValue, objBValue)) return false;
    }
  }

  // 이 부분을 적절히 수정하세요.
  return true;
};
