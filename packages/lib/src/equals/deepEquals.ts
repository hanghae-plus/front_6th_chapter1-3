// 두 값의 깊은 비교를 수행합니다

export const deepEquals = (a: unknown, b: unknown) => {
  // 1. 기본 타입이거나 null인 경우 처리
  // 2. 둘 다 객체인 경우
  //    - 배열인지 확인
  //    - 객체의 키 개수가 다른 경우 처리
  //    - 재귀적으로 각 속성에 대해 deepEquals 호출

  // 기본 타입일 때 값이 같거나, 같은 메모리 주소를 보고 있으면 true 처리
  if (a === b) return true;

  // 둘 중 하나라도 null이면 false처리
  if (a === null || b === null) return false;

  // 배열, 객체가 아니라면 false 리턴
  if (typeof a !== "object" || typeof b !== "object") return false;

  // 배열인지 확인
  const isArrayA = Array.isArray(a);
  const isArrayB = Array.isArray(b);

  if (isArrayA !== isArrayB) return false;
  if (isArrayA && isArrayB) {
    // 길이 다르면 false
    if (a.length !== b.length) return false;

    // 배열의 각 요소를 재귀적으로 비교
    // 요소가 배열, 객체일 수도 있으니까
    for (let i = 0; i < a.length; i++) {
      if (!deepEquals(a[i], b[i])) return false;
    }

    return true;
  }

  // 객체인지 확인
  const keysA = Object.keys(a as Record<string, unknown>);
  const keysB = Object.keys(b as Record<string, unknown>);

  // 객체의 길이가 다르면 리턴
  if (keysA.length !== keysB.length) return false;

  for (let i = 0; i < keysA.length; i++) {
    const currentKey = keysA[i];

    // a의 key가 b에도 있는지 확인, 없으면 -> false
    if (!Object.prototype.hasOwnProperty.call(b, currentKey)) return false;

    if (!deepEquals((a as Record<string, unknown>)[currentKey], (b as Record<string, unknown>)[currentKey]))
      return false;
  }

  return true;
};
