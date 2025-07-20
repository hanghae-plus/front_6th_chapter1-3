export function isArray(value: unknown) {
  return Array.isArray(value);
}

export function isObject(value: unknown) {
  return typeof value === "object" && value !== null;
}

export function compareArrays(a: unknown[], b: unknown[], compareFn = Object.is) {
  return a.length === b.length && a.every((item, index) => compareFn(item, b[index]));
}

export function compareObjects(a: object, b: object, compareFn = Object.is) {
  const aObj = a as Record<string, unknown>;
  const bObj = b as Record<string, unknown>;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  return keysA.length === keysB.length && keysA.every((key) => key in bObj && compareFn(aObj[key], bObj[key]));
}
