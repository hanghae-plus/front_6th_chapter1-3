export const deepEquals = (a: unknown, b: unknown) => {
  // 1. 값이 같으면 바로 true 반환 참조 타입의 경우 주소 비교
  if (Object.is(a, b)) {
    return true;
  }

  // 2. 원시 값 처리
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) {
    return Object.is(a, b);
  }

  // 3. 배열 깊은비교 재귀
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }

    for (let i = 0; i < a.length; i++) {
      if (!deepEquals(a[i], b[i])) return false;
    }

    return true;
  }

  // 4. 객체 깊은비교 재귀
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!deepEquals(a[key as keyof typeof a], b[key as keyof typeof b])) return false;
  }

  return true;
};
