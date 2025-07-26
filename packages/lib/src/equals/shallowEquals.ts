export function shallowEquals(a: unknown, b: unknown): boolean {
  // 두 값이 완전히 동일한가요?
  if (Object.is(a, b)) {
    return true;
  }

  // null이거나 undefined가 있나요?
  if (a == null || b == null) {
    return a === b;
  }

  // 동일한 함수인가요?
  if (typeof a === "function" && typeof b === "function") {
    return a.toString() === b.toString();
  }

  // object가 아닌가요?
  if (typeof a !== "object" || typeof b !== "object") {
    return false;
  }

  // 생성자가 같은가요?
  if (a.constructor !== b.constructor) {
    return false;
  }

  // 동일한 Date 값인가요?
  if (a instanceof Date && b instanceof Date) {
    // .getTime()으로 비교하면 값이 같음으로 true로 반환 할 수 있다.
    return a === b;
  }

  // 동일한 RegExp 값인가요?
  if (a instanceof RegExp && b instanceof RegExp) {
    return a.source === b.source && a.flags === b.flags;
  }

  // 둘 값이 key, value를 가지는 객체네요.
  // 두 객체의 키 개수가 같은가요?
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) return false;

  // 모든 키가 같은가요?
  for (const key of aKeys) {
    if (a[key as keyof typeof a] !== b[key as keyof typeof b]) {
      return false;
    }
  }

  return true;
}
