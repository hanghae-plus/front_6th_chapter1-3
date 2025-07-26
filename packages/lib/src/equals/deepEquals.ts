// WeakSet을 사용하여 순환참조 방지
export const deepEquals = (a: unknown, b: unknown, visited = new WeakSet()): boolean => {
  // 두 값이 완전히 동일한가요?
  if (Object.is(a, b)) {
    return true;
  }

  // null이거나 undefined가 있나요?
  if (a == null || b == null) {
    return a === b;
  }

  // Date 객체인가요?
  if (a instanceof Date && b instanceof Date) {
    // .getTime()으로 비교하면 값이 같음으로 true로 반환 할 수 있다.
    return a === b; // 참조가 다르므로 false 반환
  }

  // 동일한 함수인가요?
  if (typeof a === "function" && typeof b === "function") {
    return a.toString() === b.toString();
  }

  // 동일한 RegExp 값인가요?
  if (a instanceof RegExp && b instanceof RegExp) {
    return a.source === b.source && a.flags === b.flags;
  }

  // 두 값이 배열인가요?
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    // 순환할 때 이미 방문한 객체라면 return 한다.
    if (visited.has(a)) return true;
    visited.add(a);

    for (let i = 0; i < a.length; i++) {
      if (!deepEquals(a[i], b[i], visited)) return false;
    }
    return true;
  }

  // 두 값이 key, value를 가지는 객체네요.
  if (typeof a === "object" && typeof b === "object") {
    // 순환할 때 이미 방문한 객체라면 return 한다.
    if (visited.has(a)) return true;
    visited.add(a);

    const keysA = Object.keys(a as Record<string, unknown>);
    const keysB = Object.keys(b as Record<string, unknown>);

    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
      if (!(key in b)) return false;
      if (!deepEquals((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key], visited)) return false;
    }
    return true;
  }

  // 타입이 다르거나 원시 타입인데 값이 다릅니다
  return false;
};
