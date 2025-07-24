# shallow-equals

얕은비교라고 말하며, 흔히 원시값 비교와 객체나 배열의 1deps까지의 원시값을 비교한다.

리액트에서는 dependency값이 변했는지 확인할 때 사용된다.

## 구현 방법

뇌 흐름대로 생각해봤을 때는 원시값들은 원시값끼리 비교하고, array, object들은 1deps 값들을 비교해주면 될 것 같다

그래서 코드를 짰다.

```ts
const checkNullEquality = (a: unknown, b: unknown): boolean => {
  return a === b;
};

const checkArrayEquality = (a: unknown, b: unknown): boolean => {
  if (!Array.isArray(a) || !Array.isArray(b)) {
    return false;
  }

  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
};

const checkObjectEquality = (a: object | null, b: object | null): boolean => {
  if (a === null || b === null) {
    return checkNullEquality(a, b);
  }

  if (Array.isArray(a) || Array.isArray(b)) {
    return checkArrayEquality(a, b);
  }

  const aObj = a;
  const bObj = b;

  const keysA = Object.keys(aObj);
  const keysB = Object.keys(bObj);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!(key in bObj) || aObj[key] !== bObj[key]) {
      return false;
    }
  }

  return true;
};

const checkPrimitiveEquality = (a: unknown, b: unknown): boolean => {
  return a === b;
};

// 파이프라인 구조로 얕은 비교 수행
export const shallowEquals = (a: unknown, b: unknown): boolean => {
  // 1. 타입 체크
  if (typeof a !== typeof b) {
    return false;
  }

  // 2. object 체크
  if (typeof a === "object" && typeof b === "object") {
    return checkObjectEquality(a, b);
  }

  // 3. 원시값 체크
  return checkPrimitiveEquality(a, b);
};
```

뇌의 흐름대로는 짰는데, object 확인쪽에서 타입추론이 정확히 되지 않았다.

다시 생각해보니 type of object로 추론되는 것은 원시값이 아닌 모든 객체들이니 이걸로는 커버가 안되겠다는 생각이 들었다. (Map, Set 등등..)

그 많은 객체들을 커버해주려면 코드가 상당히 지저분해질 것 같다는 고민이 들어서 zustand의 shallow 함수를 확인해보았다.

## zustand shallow

```ts
const isIterable = (obj: object): obj is Iterable<unknown> => Symbol.iterator in obj;

const hasIterableEntries = (
  value: Iterable<unknown>,
): value is Iterable<unknown> & {
  entries(): Iterable<[unknown, unknown]>;
} =>
  // HACK: avoid checking entries type
  "entries" in value;

const compareEntries = (
  valueA: { entries(): Iterable<[unknown, unknown]> },
  valueB: { entries(): Iterable<[unknown, unknown]> },
) => {
  const mapA = valueA instanceof Map ? valueA : new Map(valueA.entries());
  const mapB = valueB instanceof Map ? valueB : new Map(valueB.entries());
  if (mapA.size !== mapB.size) {
    return false;
  }
  for (const [key, value] of mapA) {
    if (!Object.is(value, mapB.get(key))) {
      return false;
    }
  }
  return true;
};

// Ordered iterables
const compareIterables = (valueA: Iterable<unknown>, valueB: Iterable<unknown>) => {
  const iteratorA = valueA[Symbol.iterator]();
  const iteratorB = valueB[Symbol.iterator]();
  let nextA = iteratorA.next();
  let nextB = iteratorB.next();
  while (!nextA.done && !nextB.done) {
    if (!Object.is(nextA.value, nextB.value)) {
      return false;
    }
    nextA = iteratorA.next();
    nextB = iteratorB.next();
  }
  return !!nextA.done && !!nextB.done;
};

export function shallow<T>(valueA: T, valueB: T): boolean {
  if (Object.is(valueA, valueB)) {
    return true;
  }
  if (typeof valueA !== "object" || valueA === null || typeof valueB !== "object" || valueB === null) {
    return false;
  }
  if (Object.getPrototypeOf(valueA) !== Object.getPrototypeOf(valueB)) {
    return false;
  }
  if (isIterable(valueA) && isIterable(valueB)) {
    if (hasIterableEntries(valueA) && hasIterableEntries(valueB)) {
      return compareEntries(valueA, valueB);
    }
    return compareIterables(valueA, valueB);
  }
  // assume plain objects
  return compareEntries({ entries: () => Object.entries(valueA) }, { entries: () => Object.entries(valueB) });
}
```

역시 검증된 라이브러리 읽기가 아주 좋다!
인상적인 부분도 있고, 의문점도 있다.

일단 인상적인 부분부터 한번 풀어보았다.

### zustand 인상적인 부분

1. isIterable함수를 사용하여 Symbol.iterator가 구현된 객체와 구현이 안된 객체를 구분하고 있다

Map, Set, Array 들은 순서가 보장된 자료구조이다.
같은 값들이 있더라도 순서가 달라지면 다른 값으로 인식해야되며 그에 맞는 iterator 객체들이 갖고 있는 메서드들을 사용하여 알맞는 로직을 태워야 한다.

2. Object.is를 통한 원시값 비교
   원시값 비교할 때 ===를 사용하면 문제가 되는 경우가 있다.
1. number type의 NaN
1. +0 -0
   해당 값들은 ===으로만 비교했을 때는 서로 다른 값으로 취급받는다.

### 의문점

zustand를 찾아보게 된 계기는 다른 객체들의 비교를 어떻게 해주냐 였는데, 흔하게 사용되는 Date 객체도 마찬가지고, 그 외의 여러 객체들은 비교를 하고 있지 않다는 것이다.

왜그럴까?
바로 찾아봤다.

https://github.com/pmndrs/zustand/issues/1064
이슈가 제기는 되었었다.
의도한 동작 자체가 object나 array를 의도했기에 지원하지 않았었다고 한다.

Map Set을 지원해주면서 들어갔던 pr에서도 언급되어있다.
https://github.com/pmndrs/zustand/pull/1451

해당 기능을 지원해줄지 고민했었던 것으로 보이고 문서에서 설명해주는 것만 지원해주기로 한것으로 보인다.

https://zustand.docs.pmnd.rs/apis/shallow#troubleshooting

문서에는 지원해주는 객체 타입들이 명시되어 있다.

결국 완벽한 얕은비교를 구현한다는건 불필요하고 쉽지 않다고 생각이 들었다.

## 다시 구현

zustand의 shallow를 사용하면 올바르게 작동할 것이다.
하지만 의문점의 시작인 date 객체의 비교만 추가해보았다.

```ts
export function shallowEquals<T>(valueA: T, valueB: T): boolean {
  if (Object.is(valueA, valueB)) {
    return true;
  }
  if (typeof valueA !== "object" || valueA === null || typeof valueB !== "object" || valueB === null) {
    return false;
  }
  if (Object.getPrototypeOf(valueA) !== Object.getPrototypeOf(valueB)) {
    return false;
  }
  if (isIterable(valueA) && isIterable(valueB)) {
    if (hasIterableEntries(valueA) && hasIterableEntries(valueB)) {
      return compareEntries(valueA, valueB);
    }
    return compareIterables(valueA, valueB);
  }

  if (valueA instanceof Date && valueB instanceof Date) {
    return valueA.getTime() === valueB.getTime();
  }

  // assume plain objects
  return compareEntries({ entries: () => Object.entries(valueA) }, { entries: () => Object.entries(valueB) });
}
```

date 객체는 Iterable 객체를 갖고 있지 않으니 그 후에 Date객체인지 확인하고 같은 시간인지 비교해주는 코드를 추가하였다.

필요시에 이렇게 객체들을 다 비교해주는 코드가 들어가면 될 것 같다.
