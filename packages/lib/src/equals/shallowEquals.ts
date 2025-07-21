export function shallowEquals(a: unknown, b: unknown): boolean {
  // 참조가 같으면(같은 메모리 주소를 가르키면
  if (a === b) return true;

  // null 또는 undefined 체크
  if (a == null || b == null) return false;

  // 타입이 다르면 false
  if (typeof a !== typeof b) return false;

  // 객체가 아닌 경우 값 비교 (원시타입일 경우 처리)
  if (typeof a !== "object") return a === b;

  // 배열인 경우
  //두 값의 길이가 다르고, 각 요소를 얕은 비교합니다.

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((item, index) => item === b[index]);
  }

  const objA = a as { [key: string]: unknown };
  const objB = b as { [key: string]: unknown };

  // 객체의 키 개수가 다르면 false
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  // 최상위 레벨의 값만 비교
  return keysA.every((key) => objA[key] === objB[key]);
}
