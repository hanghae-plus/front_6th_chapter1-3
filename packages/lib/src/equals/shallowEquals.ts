//객체의 최상위 속성들만 비교하며, 중첩된 객체는 참조값(메모리 주소)만 비교함
export const shallowEquals = (a: unknown, b: unknown) => {
  // 객체의 최상위 속성들만 비교
  // 중첩된 객체는 참조값만 비교
  // Object.is로 구현하려 함.

  if (Object.is(a, b)) return true;

  // 값이 객체가 아닌경우
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false;

  const KeysA = Object.keys(a);
  const KeysB = Object.keys(b);
  // key의 개수가 다른경우

  if (KeysA.length !== KeysB.length) return false;
  // key는 같은데 값이 다른 case

  // Key는 같지만 값이 다른경우

  // 배열일때
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!Object.is(a[i], b[i])) return false;
    }
    return true;
  }
  // 키가 같다면 각 값들을 비교
  // 값들을 비교한다고 해당하는 키에 맞는 발류를 가져오는데 타입 에러가 나옴
  for (const key of KeysA) {
    if ((a as Record<string, unknown>)[key] !== (b as Record<string, unknown>)[key]) return false;
  }

  return true;
};

/**
 *  
 * 의문점 === 와 Object.is의 차이점은 뭘까?
두 비교 연산자는 값이 number 타입인 경우 비교하는 방식에 차이가 있다.

=== 에서 사용하는 숫자 비교의 경우 NaN 끼리 비교는 false 로 처리하고, 0 을 비교할 때 부호를 고려하지 않는다.

NaN === NaN // false
+0 === -0 // true
Object.is 의 경우 NaN 끼리 비교는 true 로 처리하고, 0 을 비교할 때 부호를 고려한다.

NaN === NaN // true
+0 === -0 // false

 */
