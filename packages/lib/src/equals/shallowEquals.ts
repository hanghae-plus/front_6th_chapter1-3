// a와b를 받고 타입은 unknown shallowEquals의 반환값 타입은 boolean
// 얕은 비교는 [1,2,3]  {a:1,b:2} 각 배열과 객체가 주어지면 안의  ""만 비교한다
// 기본형이면 === 비교

// 배열이면 길이가 같고 각 요소가 === 인지 비교

// 객체이면 키, 값이 === 인지 비교
export const shallowEquals = (a: unknown, b: unknown): boolean => {
  // 배열부터
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;

    return a.every((v, i) => v === b[i]);
  }

  // 객체
  if (
    typeof a === "object" &&
    typeof b === "object" &&
    a !== null &&
    b !== null &&
    !Array.isArray(a) &&
    !Array.isArray(b)
  ) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) return false;

    return aKeys.every(
      (key) => bKeys.includes(key) && (a as Record<string, unknown>)[key] === (b as Record<string, unknown>)[key],
    );
  }
  return a === b;
};
