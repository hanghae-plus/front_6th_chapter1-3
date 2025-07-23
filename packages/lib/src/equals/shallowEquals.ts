export const shallowEquals = (a: unknown, b: unknown) => {
  // 기본값 === 비교
  if (a === b) return true;

  // null 체크(null의 타입도 객체이므로 체크)
  if (a == null || b == null) return false;

  // 타입이 다르면 false
  if (typeof a !== typeof b) return false;

  // 객체나 배열인 경우
  if (typeof a === "object") {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    // 키 개수 다르면 false
    if (aKeys.length !== bKeys.length) return false;

    // 각 key의 값이 === 인지 확인
    for (const key of aKeys) {
      if (!Object.hasOwn(b, key)) return false;
      if (a[key as keyof typeof a] !== b[key as keyof typeof b]) return false;
    }

    return true;
  }

  // 나머지는 === 비교로 처리
  return false;
};
