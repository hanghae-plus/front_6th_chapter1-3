const isObject = (a: unknown): a is Record<string, unknown> => {
  return a !== null && typeof a === "object";
};

/** @todo 리팩토링 필요 */
export const deepEquals = (a: unknown, b: unknown): boolean => {
  const isAObject = isObject(a);
  const isBObject = isObject(b);

  // 한쪽만 참조형일경우 동일하지 않음
  if (isAObject !== isBObject) return false;
  // 한쪽만 어레이일 경우도 동일하지 않음
  if (Array.isArray(a) !== Array.isArray(b)) return false;

  // 배열끼리 비교
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.every((item, index) => {
      return deepEquals(b[index], item);
    });
  }

  // 객체끼리 비교, 타입 추론을 위해 if문 한겹 더 씌움
  if (isAObject && isBObject) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) return false;

    for (const key of aKeys) {
      if (!deepEquals(a[key], b[key])) return false;
    }
    return true;
  }

  // 둘 다 참조형 아닐 때
  return a === b;
};
