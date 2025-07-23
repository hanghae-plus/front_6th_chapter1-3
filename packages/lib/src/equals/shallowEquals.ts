export const shallowEquals = (a: unknown, b: unknown) => {
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }

    for (let i = 0; i < a.length; i++) {
      const el = a[i];

      if (el !== b[i]) {
        return false;
      }
    }

    return true;
  }

  if (typeof a === "object" && typeof b === "object" && a && b) {
    const aKeys = Object.keys(a).sort();
    const bKeys = Object.keys(b).sort();

    if (aKeys.length !== bKeys.length) {
      return false;
    }

    for (let i = 0; i < aKeys.length; i++) {
      const aKey = aKeys[i] as keyof typeof a;
      const bKey = bKeys[i] as keyof typeof b;

      if (aKey !== bKey || a[aKey] !== b[bKey]) {
        return false;
      }
    }

    return true;
  }

  return a === b;
};
