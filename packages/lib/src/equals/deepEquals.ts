type AnonymousObj = { [key: string]: unknown };

export const deepEquals = (a: unknown, b: unknown): boolean => {
  if (typeof a !== typeof b) return false;

  if (a === null || b === null) return a === b;

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((item, index) => deepEquals(item, b[index]));
  }

  if (typeof a === "object" && typeof b === "object") {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    return aKeys.every((key) => deepEquals((a as AnonymousObj)[key], (b as AnonymousObj)[key]));
  }

  return a === b;
};
