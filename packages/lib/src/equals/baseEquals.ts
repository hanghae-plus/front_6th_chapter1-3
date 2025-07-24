type ComparisonCallback = (a: unknown, b: unknown) => boolean;

export const baseEquals = (a: unknown, b: unknown, compareValues: ComparisonCallback): boolean => {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (a === b) {
    return true;
  }

  // 2. null이나 undefined 처리
  if (a === null || a === undefined || b === null || b === undefined) {
    return false; // 이미 위에서 같은 경우는 처리했으므로, 여기서는 서로 다른 경우
  }

  // 3. 둘 중 하나라도 객체가 아닌 경우 처리 (primitive 값들)
  if (typeof a !== "object" || typeof b !== "object") {
    return false; // primitive 값들은 이미 위에서 === 비교로 처리됨
  }

  // 4. 배열인 경우 처리
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (!compareValues(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }

  // 5. 한쪽만 배열인 경우
  if (Array.isArray(a) || Array.isArray(b)) {
    return false;
  }

  // 6. 객체인 경우 처리
  const keysA = Object.keys(a as Record<string, unknown>);
  const keysB = Object.keys(b as Record<string, unknown>);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // 7. 모든 키에 대해 콜백을 사용하여 비교 수행
  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) {
      return false;
    }

    if (!compareValues((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])) {
      return false;
    }
  }

  return true;
};
