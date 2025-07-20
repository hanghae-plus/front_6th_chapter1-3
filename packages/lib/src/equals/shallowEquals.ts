export const shallowEquals = (a: unknown, b: unknown) => {
  if (Object.is(a, b)) {
    return true;
  }

  if (typeof a !== "object" || a === null || typeof b !== "object" || b === null) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) {
    return false;
  }

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
