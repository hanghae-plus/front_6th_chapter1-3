export function deepEquals(a: unknown, b: unknown): boolean {
  if (a === b) {
    return true;
  }

  const nullish = a == null || b == null;
  const differentType = typeof a !== typeof b;
  const notObject = typeof a !== "object" || typeof b !== "object";

  if (nullish || differentType || notObject) {
    return false;
  }

  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) {
      return false;
    }

    for (let i = 0; i < a.length; i++) {
      if (!deepEquals(a[i], b[i])) {
        return false;
      }
    }

    return true;
  }

  const [aObj, bObj] = [a as Record<string, unknown>, b as Record<string, unknown>];
  const [keysA, keysB] = [Object.keys(aObj), Object.keys(bObj)];
  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!deepEquals(aObj[key], bObj[key])) {
      return false;
    }
  }

  return true;
}
