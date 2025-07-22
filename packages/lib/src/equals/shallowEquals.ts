// 250721
// shallowEquals(얕은비교) 함수는 두 값의 얕은 비교를 수행합니다.
// 다양한 타입(기본값, 배열, 객체 등)을 받아야 하므로 unknown 타입으로 선언
// object | null | number | string | boolean | undefined 등으로 union 타입을 쓸 수도 있지만 제한적
// 실제로는 unknown(아무 값이나 올 수 있지만, 바로 쓸 수는 없는 안전한 any)이 가장 범용적이고 안전
export function shallowEquals(objA: unknown, objB: unknown): boolean {
  // 요구사항
  // 1. 두 값이 정확히 같은지(===) 확인 (참조가 같은 경우)
  // (===) 인줄 알았는데 이런게 있다. Object.is(objA, objB) : 두 값이 같은 값인지 결정, 정적 메서드
  if (Object.is(objA, objB)) return true;

  // 2. 둘 중 하나라도 객체가 아닌 경우 처리 - 진짜 객체만 분류
  // objA === null: null도 true, typeof objA !== "object": 숫자, 문자열, 불리언, undefined 등은 true
  // 자바스크립트에서 typeof null의 결과는 "object"(자바스크립트의 오래된 설계 실수)
  // 그래서 단순히 typeof objA !== "object"만 체크하면 null도 "object"로 간주되어, null을 객체처럼 처리하는 버그가 발생할 수 있음
  // null과 객체를 구분하려면 null은 객체가 아니어야 하고, 진짜 객체만 객체로 취급해야 함. 그래서 두 조건을 모두 체크해야 함
  // objA === null, objB === null 를 빼도 테스트는 통과가 되지만 null이 들어와도 Object.keys(null) 등에서 런타임 에러가 날 수 있어서 추가하는게 안전하다고 함
  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) return false;

  // 3. 객체의 키 개수가 다른 경우 처리 - Object.keys(obj).length;
  // 주신 자료 그대로 쓰니 에러남 타입단언 필요
  // objA, objB가  unknown이나 any일 때 타입 에러 발생,
  // 타입상 object임을 TypeScript에 명확히 알려주기 위해 Object.keys(objA as object)처럼 타입 단언이 필요
  const keysA = Object.keys(objA as object);
  const keysB = Object.keys(objB as object);

  if (keysA.length !== keysB.length) return false;

  // 4. 모든 키에 대해 얕은 비교 수행
  for (let i = 0; i < keysA.length; i++) {
    const currentKey = keysA[i];
    // Object 인스턴스의 hasOwnProperty() 메서드는 해당 객체 자체의 고유한 속성인지 (상속 받은 속성이 아닌지) 나타내는 불리언 값을 반환
    // for...in 루프에서 상속된 프로퍼티를 거르기 위해 자주 사용.
    // 라이브러리/프레임워크 등에서 객체의 신뢰성을 보장할 수 없을 때 많이 사용.
    // .call() obj를 this로 해서 hasOwnProperty를 실행
    // (objA as Record<string, unknown>) 객체 리터럴의 타입을 명시적으로 Record<string, unknown>로 변환하는 타입 단언(type assertion)
    if (
      !Object.prototype.hasOwnProperty.call(objB, currentKey) ||
      !Object.is((objA as Record<string, unknown>)[currentKey], (objB as Record<string, unknown>)[currentKey])
    ) {
      return false;
    }
  }

  // 테스트 조건
  // 기본 타입 값들을 정확히 비교(===)해야 한다.
  // 배열을 얕게 비교해야 한다
  // 객체를 얕게 비교해야 한다
  // 중첩된 구조를 깊게 비교하지 않아야 한다
  return true;
}
