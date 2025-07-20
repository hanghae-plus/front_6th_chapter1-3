export const deepEquals = (a: unknown, b: unknown) => {
  //모든 수준의 속성/요소를 재귀적으로 비교

  if (Object.is(a, b)) return true;

  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!deepEquals((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])) return false;
  }

  return true;
};
