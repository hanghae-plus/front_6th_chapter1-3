const isObject = (target: unknown): target is Record<string, unknown> => {
  return target !== null && typeof target === "object" && !Array.isArray(target);
};

export const baseEquals = (a: unknown, b: unknown, equalFn = Object.is) => {
  if (Object.is(a, b)) {
    return true;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((value, index) => equalFn(b[index], value));
  }

  if (isObject(a) && isObject(b)) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    return aKeys.length === bKeys.length && aKeys.every((key) => equalFn(a[key], b[key]));
  }

  return false;
};
