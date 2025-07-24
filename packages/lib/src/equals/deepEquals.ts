const isIterable = (obj: object): obj is Iterable<unknown> => Symbol.iterator in obj;

const hasIterableEntries = (
  value: Iterable<unknown>,
): value is Iterable<unknown> & {
  entries(): Iterable<[unknown, unknown]>;
} => "entries" in value;

const compareEntriesDeep = (
  valueA: { entries(): Iterable<[unknown, unknown]> },
  valueB: { entries(): Iterable<[unknown, unknown]> },
) => {
  const mapA = valueA instanceof Map ? valueA : new Map(valueA.entries());
  const mapB = valueB instanceof Map ? valueB : new Map(valueB.entries());
  if (mapA.size !== mapB.size) {
    return false;
  }
  for (const [key, value] of mapA) {
    if (!deepEquals(value, mapB.get(key))) {
      return false;
    }
  }
  return true;
};

const compareIterablesDeep = (valueA: Iterable<unknown>, valueB: Iterable<unknown>) => {
  const iteratorA = valueA[Symbol.iterator]();
  const iteratorB = valueB[Symbol.iterator]();
  let nextA = iteratorA.next();
  let nextB = iteratorB.next();
  while (!nextA.done && !nextB.done) {
    if (!deepEquals(nextA.value, nextB.value)) {
      return false;
    }
    nextA = iteratorA.next();
    nextB = iteratorB.next();
  }
  return !!nextA.done && !!nextB.done;
};

export function deepEquals<T>(valueA: T, valueB: T): boolean {
  // shallowEquals의 기본 로직 그대로 사용
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
      return compareEntriesDeep(valueA, valueB);
    }
    return compareIterablesDeep(valueA, valueB);
  }

  if (valueA instanceof Date && valueB instanceof Date) {
    return valueA.getTime() === valueB.getTime();
  }

  // 일반 객체 처리 - shallowEquals의 로직을 deep으로 변경
  return compareEntriesDeep({ entries: () => Object.entries(valueA) }, { entries: () => Object.entries(valueB) });
}
