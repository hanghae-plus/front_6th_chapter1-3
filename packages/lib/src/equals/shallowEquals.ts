export const shallowEquals = (a: unknown, b: unknown) => {
  if (a === b) return true;

  if (typeof a !== "object" || a === null || typeof b !== "object" || b === null) return false;

  const objA = a as Record<string, unknown>;
  const objB = b as Record<string, unknown>;

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (objA[key] !== objB[key]) return false;
  }

  return true;
};
