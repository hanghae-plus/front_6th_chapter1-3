export const shallowEquals = (a: unknown, b: unknown) => {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (a === b) {
    return true;
  }

  // 2. 둘 중 하나라도 객체가 아닌 경우 처리
  if (a === null || a === undefined || b === null || b === undefined) {
    return false; // 이미 위에서 같은 경우는 처리했으므로, 여기서는 서로 다른 경우
  }

  if (typeof a !== "object" || typeof b !== "object") {
    return false; // primitive 값들은 이미 위에서 === 비교로 처리됨
  }

  // 3. 객체의 키 개수가 다른 경우 처리
  const keysA = Object.keys(a as Record<string, unknown>);
  const keysB = Object.keys(b as Record<string, unknown>);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // 4. 모든 키에 대해 얕은 비교 수행
  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) {
      return false;
    }

    if ((a as Record<string, unknown>)[key] !== (b as Record<string, unknown>)[key]) {
      return false;
    }
  }

  return true;
};
