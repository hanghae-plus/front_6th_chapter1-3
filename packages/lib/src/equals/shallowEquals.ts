export const shallowEquals = (a: unknown, b: unknown) => {
  if (typeof a !== typeof b) return false;

  // 배열 비교
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((v, index) => v === b[index]);
  }

  // 객체 비교
  if (typeof a === "object" && typeof b === "object" && a !== null && b !== null) {
    const objA = a as Record<string, unknown>;
    const objB = b as Record<string, unknown>;
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) return false;

    return keysA.every((key) => {
      if (key in objA && key in objB) {
        return objA[key] === objB[key];
      }
      return false;
    });
  }

  return a === b;
};
