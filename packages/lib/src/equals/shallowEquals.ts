export const shallowEquals = (a: unknown, b: unknown): boolean => {
  if (typeof a !== typeof b) {
    return false;
  }

  if (typeof a !== "object" || typeof b !== "object" || a == null || b == null) {
    return a === b;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }

    return a.every((ai, i) => shallowEquals(ai, b[i]));
  }

  const aKeys = Object.keys(a) as (keyof typeof a)[];
  const bKeys = Object.keys(b) as (keyof typeof b)[];

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  if (aKeys.length === 0) {
    return a === b;
  }

  const keys = new Set([...aKeys, ...bKeys]);

  for (const key of keys) {
    if (a[key] !== b[key]) {
      return false;
    }
  }

  return true;
};
