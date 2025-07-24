const isArray = (data: unknown): data is unknown[] => Array.isArray(data);

const isObject = (data: unknown): data is Record<string, unknown> => typeof data === "object" && data !== null;

export const deepEquals = (a: unknown, b: unknown): boolean => {
  if (a === b) return true;

  if (isArray(a) && isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((v, i) => deepEquals(v, b[i]));
  }

  if (isObject(a) && isObject(b)) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;
    return keysA.every((key) => deepEquals(a[key], b[key]));
  }

  return false;
};
