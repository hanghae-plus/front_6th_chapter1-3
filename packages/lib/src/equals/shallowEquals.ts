export const shallowEquals = (a: unknown, b: unknown) => {
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;

    return a.every((val, index) => val === b[index]);
  }

  if (typeof a === "object" && typeof b === "object" && a !== null && b !== null) {
    const aObj = a as Record<string, unknown>;
    const bObj = b as Record<string, unknown>;
    const aKeys = Object.keys(aObj);
    const bKeys = Object.keys(bObj);

    if (aKeys.length !== bKeys.length) return false;

    return aKeys.every((key) => Object.prototype.hasOwnProperty.call(bObj, key) && aObj[key] === bObj[key]);
  }
  return a === b;
};
