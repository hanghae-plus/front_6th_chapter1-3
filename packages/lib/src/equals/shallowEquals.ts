type Primitive = string | number | boolean | null | undefined | bigint | symbol;

export const shallowEquals = (a: unknown, b: unknown) => {
  if (typeof a !== typeof b) return false;

  if (isPrimitive(a) && isPrimitive(b)) {
    return a === b;
  }

  if (isArray(a) && isArray(b)) {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }

    return true;
  }

  if (isObject(a) && isObject(b)) {
    const keysA = getObjectKeys(a);
    const keysB = getObjectKeys(b);

    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
      if (a[key] !== b[key]) return false;
    }

    return true;
  }

  return a === b;
};

const isArray = (value: unknown): value is unknown[] => Array.isArray(value);

const isObject = (value: unknown): value is object => typeof value === "object" && value !== null;

const isPrimitive = (value: unknown): value is Primitive => typeof value !== "object" || value === null;

const getObjectKeys = <T extends object>(o: T): (keyof T)[] => Object.keys(o) as (keyof T)[];
