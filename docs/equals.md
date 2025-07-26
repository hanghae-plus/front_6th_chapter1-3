# Equalities 만들기

## shallowEquals

#### 고민한 부분

**1차 고민**

```ts
// 1. 두 값이 정확히 같나요?
if (a === b) return true;

// 두 값이 유효한 값인가요?
if (a === null || b === null || a === undefined || b === undefined) return false;
```

처음에 해당 코드를 추가하여 둘 중에 한 값이 null이나 undefined일 경우의 예외처리를 추가해야한다고 생각했다. 하지만 생각해보니 이미 첫 조건문에서 두 값이 같은지 확인하고 있기 때문에 nullable한 값을 중복으로 체크하지 않아도 되어 불필요한 코드를 삭제하였다.

**2차 고민**

```ts
if (typeof a !== "object" || typeof b !== "object") return false;
// 둘 다 객체네요.
// 3. 그럼 객체의 키 개수가 같은가요?
const aKeys = Object.keys(a);
const bKeys = Object.keys(b);
```

객체인지 확인 하는 조건문에서 고민이 생겼다. 원시 값이 아닌 다른 값들을 typeof로 비교하기엔 조건문이 완벽하지 않다고 생각했다. 그래서 zustand를 뒤져보았다. 아래는 쥬스탄트의 shallow 함수이다.

```ts
export function shallow<T>(valueA: T, valueB: T): boolean {
  // 완전히 동일한지 확인한다.
  if (Object.is(valueA, valueB)) {
    return true;
  }
  // 둘 중 하나라도 null이 있거나 'object'가 아닌지 확인한다.
  if (typeof valueA !== "object" || valueA === null || typeof valueB !== "object" || valueB === null) {
    return false;
  }

  // 프로토타입이 같은지 확인한다.
  if (Object.getPrototypeOf(valueA) !== Object.getPrototypeOf(valueB)) {
    return false;
  }
  // isIterable는 반복 가능한 객체인지 판단한다.
  // 일반적인 key, value 객체
  if (isIterable(valueA) && isIterable(valueB)) {
    // hasIterableEntries는 .entries메서드를 가지고있는 객체인지 판단한다.
    // Map, Set, Arrray
    if (hasIterableEntries(valueA) && hasIterableEntries(valueB)) {
      // compareEntries Map이 아니라면 Map으로 변환하여 비교한다.
      return compareEntries(valueA, valueB);
    }
    // compareIterables 둘 다 끝날 때 까지 순서대로 비교한다.
    return compareIterables(valueA, valueB);
  }

  // 일반 객체는 .entries로 비교한다.
  return compareEntries({ entries: () => Object.entries(valueA) }, { entries: () => Object.entries(valueB) });
}
```

코드를 보고나니 간지러웠던 부분을 긁어주는 느낌이었다. `.getPrototypeOf`로 프로토타입 체크, `.entries` 메서드 체크, `iterable` 반복 체크까지 든든하다.

하지만! 내 궁금증은 여기서 끝나지 않았으니, 해당 코드를 ChatGpt에게 주고 더 예외처리할 수 있는게 있는지 확인해보았다.

ChatGpt는 다음의 추가 조건들을 제안해주었다.

```
1. null과 undefined 체크 로직 추가
2. 객체가 자신을 참조할 때의 무한 루프 방지. 순환 참조 처리
3. Date, RegEx, function 체크 로직 추가
4. 순서가 중요하지 않은 경우의 로직 추가
5. 프로토타입 뿐만 아니라 같은 생성자인지 체크하는 로직 추가
6. 빈 객체 로직 추가
```

1번의 null, undefined 체크는 처음에 고민했던 부분이라 추가했다.
2번은 shallow함수 특성상 순환 참조가 발생할 일이 없다고 판단하여 제외하였다.
3번은 Date, RegEx도 신기했지만 function을 `.toString()`으로 비교할 수 있다는 부분이 너무 신선했다. 그래서 코드에 반영했다.
4번은 Set의 경우인데, Map으로 변환해서 비교하는 로직에 순서가 중요하지 않은 예외 처리까지 필요할까.. shallowEquals함수 특성상 얕은 참조여서 기존 로직으로도 커버 가능한 부분일 것 같아 제외하였다.
5번도 신선하게 느껴졌다. 예를 들면 아래 코드와 같이 값은 같지만 생성된 로직이 다른 경우이다. 이 경우도 추가하였다.

```ts
const date = new Date("2023-01-01");
const obj = { getTime: () => new Date("2023-01-01").getTime() };

console.log(date.getTime() === obj.getTime()); // true
console.log(date.constructor === obj.constructor); // false
```

6번도 빈 객체일 경우, 1번처럼 예외처리하는게 좋다고 판단하여 추가하였다.

**3차 고민**

`Symbol.iterator`를 사용하지 않고 친숙한 `for ...of`로 순회하면 좀 더 간단하지 않을까? 찾아보니 답은 **NO**였다.
`for ...of`로 순회하려면 `a`, `b`값 모두 동일하게 순회하면서 비교해야하므로 인덱스를 관리하여 비교하거나 내부에서 한번 더 순회하여 비교 로직이 중복으로 필요하다.
zustand에서는 `a`, `b`값을 동일하게 순서대로 비교하기 위해 `while`문 내부에서 `.next()`를 사용하였다.
그렇다고 `for ...of`를 전혀 사용할 수 없는건 아니지만 해당 값들이 배열인지, set인지 알 길이 없으니 안전하게 `Symbol.iterator`를 사용하여 동시에 순회하는 방법을 선택한 것이다.
2차 고민의 재밋다고 생각한 예외처리는 추가하고 `Symbol.iterator`의 코드는 따로 추가하지 않았다. zustand와 동일한 로직을 구현할까.. 잠시 고민해봤지만 스스로 작성한 코드가 아니라고 생각되어 zustand의 기본 동작을 이해하는 것으로 충분하다고 생각되었고, 테스트 코드를 통과할 정도만 남기기로 하였다.

## deepEquals

#### 고민한 부분

**1차 고민**

shallowEquals함수는 얕은 비교이기 때문에 생성자 비교가 가능한데, deepEquals는 중첩 구조일 경우가 많아 생성자 비교는 무의미하다고 생각하여 제외하였다. 나머지 functon, Date, RegExp 비교는 shallowEqauls와 동일하게 함수에 추가해놓았다.

**2차 고민**
shallowEquals함수에서 고려하지 않아도 됐었던 **순환 참조**에 대해서 고민해보아야 한다. 이 순환 참조를 어떻게 확인해서 방지할 수 있을까?
우선 재귀로 돌릴 경우에 순환 참조를 방지할 수 있는 방법에 대해서 찾아보았다.

```
1. WeakSet/WeakMap 활용
2. Set/Map 활용
3. 재귀 깊이 제한용 로직 추가
4. 경로 추적용 로직 추가
```

1번의 WeakSet/WeakMap은 이전 2주차 과제때도 이벤트 저장소로 적합한 자료구조를 선정할 때 많이 사용되었다.
2번의 Set/Map도 동일한 방식으로 사용 가능하나, 1번은 가비지 컬렉션이 자동으로 동작하여 제거해주므로 1번보다 메모리 효율성이 떨어진다.
3번은 depth, maxDepth를 추가하여 순회할 수 있는 깊이를 제한하여 오버플로우를 방지하는 방법이다.
4번은 경로 추적용 변수를 내부에 설정하여 현재 어떤 값을 갖고 순회하고 있는지 파악하는데 용이하다.

3번과 4번은 성능적으로 실무에 적용해 볼만할 것 같은 코드이나 과제 진행시에는 불필요하다는 판단이 들어 제외하였다 남은 1번과 2번을 비교했을때 메모리 효율성을 생각하면 1번이 나을 것 같았다. 2번의 Set/Map은 현재 로직보다는 key, value값으로 좀 더 복잡한 로직 비교시에 사용하는게 좋아 보인다. 단순히 현재 순회하고 있는 값 한 개만 비교하면 되니 1번을 선택하였다.
