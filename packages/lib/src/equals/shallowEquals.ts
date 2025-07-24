// shallowEquals 함수는 두 값의 얕은 비교를 수행합니다.
// 다양한 타입(기본값, 배열, 객체 등)을 받아야 하므로 unknown 타입으로 선언
export function shallowEquals(objA: unknown, objB: unknown): boolean {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (Object.is(objA, objB)) return true;

  // 2. 둘 중 하나라도 객체가 아닌 경우 처리 - 진짜 객체만 분류
  // null과 객체를 구분하려면 null은 객체가 아니어야 하고, 진짜 객체만 객체로 취급해야 함
  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) return false;

  // 3. 객체의 키 개수가 다른 경우 처리
  // 타입상 object임을 TypeScript에 명확히 알려주기 위해 타입 단언이 필요
  const keysA = Object.keys(objA as object);
  const keysB = Object.keys(objB as object);

  if (keysA.length !== keysB.length) return false;

  // 4. 모든 키에 대해 얕은 비교 수행
  for (let i = 0; i < keysA.length; i++) {
    const currentKey = keysA[i];
    // Object.prototype.hasOwnProperty.call()로 객체의 고유한 속성인지 확인
    if (
      !Object.prototype.hasOwnProperty.call(objB, currentKey) ||
      !Object.is((objA as Record<string, unknown>)[currentKey], (objB as Record<string, unknown>)[currentKey])
    ) {
      return false;
    }
  }
  return true;
}
