function flattenDeep(obj: object, parentKey = "", result = {}) {
  for (const [key, value] of Object.entries(obj)) {
    const newKey = parentKey ? `${parentKey}.${key}` : key;

    if (value !== null && typeof value === "object") {
      if (Array.isArray(value)) {
        value.forEach((item, idx) => {
          // 배열 요소도 “키.인덱스” 형태로 평탄화
          flattenDeep(item, `${newKey}[${idx}]`, result);
        });
      } else {
        flattenDeep(value, newKey, result);
      }
    } else {
      result[newKey] = value;
    }
  }
  return result;
}

export const deepEquals = (a: unknown, b: unknown) => {
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }

    const flattedA = a.flat(Infinity);
    const flattedB = b.flat(Infinity);
    return JSON.stringify(flattedA) === JSON.stringify(flattedB);
  } else if (typeof a === "object" && typeof b === "object" && a && b) {
    const flattedA = flattenDeep(a);
    const flattedB = flattenDeep(b);
    const aKeys = Object.keys(flattedA).sort();
    const bKeys = Object.keys(flattedB).sort();

    for (let i = 0; i < aKeys.length; i++) {
      const aKey = aKeys[i] as keyof typeof flattedA;
      const bKey = bKeys[i] as keyof typeof flattedB;

      if (flattedA[aKey] !== flattedB[bKey]) {
        return false;
      }
    }

    return true;
  }

  return a === b;
};
