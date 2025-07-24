const isArray = (data: unknown) => Array.isArray(data);

const isObject = (data: unknown): data is Record<string, unknown> => typeof data === "object" && data !== null;

const compareValue = (a: unknown, b: unknown) => a === b;

const compareArray = (a: unknown[], b: unknown[]) => a.length === b.length && a.every((v, i) => v === b[i]);

const compareKeys = (keysA: string[], keysB: string[]): boolean =>
  keysA.length === keysB.length && keysA.every((key) => keysB.includes(key));

const compareObject =
  (a: Record<string, unknown>, b: Record<string, unknown>) =>
  (keys: string[]): boolean =>
    keys.every((key) => a[key] === b[key]);

const compareObjects = (a: Record<string, unknown>, b: Record<string, unknown>): boolean => {
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  return compareKeys(keysA, keysB) && compareObject(a, b)(keysA);
};

export const shallowEquals = (a: unknown, b: unknown) => {
  if (compareValue(a, b)) return true;

  if (isArray(a) && isArray(b)) {
    return compareArray(a, b);
  }

  if (isObject(a) && isObject(b)) return compareObjects(a, b);
  return false;
};
