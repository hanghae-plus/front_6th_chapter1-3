export const shallowEquals = (a: unknown, b: unknown): boolean => {
  // 객체가 다르면 false 리턴

  if (Object.is(a, b)) {
    return true;
  }

  if (typeof a !== "object" || a === null || typeof b !== "object" || b === null) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  // 길이가 다르면 false 리턴
  if (keysA.length !== keysB.length) {
    return false;
  }

  // A 키를 기준으로 B에 같은 키가 있는지, 그리고 그 값이 있는지 확인
  // Object.prototype.hasOwnProperty.call() => 객체가 해당 속성을 직접 소유하고 있는지 확인
  for (let i = 0; i < keysA.length; i++) {
    const currentKey = keysA[i];

    if (
      !Object.prototype.hasOwnProperty.call(b, currentKey) ||
      !Object.is((a as Record<string, unknown>)[currentKey], (b as Record<string, unknown>)[currentKey])
    ) {
      return false;
    }
  }

  return true;
};
