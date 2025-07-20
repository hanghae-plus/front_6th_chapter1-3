export function shallowEquals(a: any, b: any): boolean {
  if (a === b) {
    return true;
  }

  const nullish = a == null || b == null;
  const notObject = typeof a !== "object" || typeof b !== "object";
  if (nullish || notObject) {
    return false;
  }

  const [keysA, keysB] = [Object.keys(a), Object.keys(b)];
  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if ((a as any)[key] !== (b as any)[key]) {
      return false;
    }
  }

  return true;
}
