/**
 * 얕은 비교를 통해 두 값이 같은지 비교하는 함수
 * @param a 비교할 값 1
 * @param b 비교할 값 2
 * @returns 얕은 비교 결과 (같으면 true, 다르면 false)
 */
export const shallowEquals = (a: unknown, b: unknown) => {
  if (a === b) {
    return true;
  }

  if (typeof a === "object" && typeof b !== "object") {
    return false;
  }

  if (typeof a !== "object" && typeof b === "object") {
    return false;
  }

  if (isObject(a) && isObject(b)) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) return false;

    const uniqueKeys = new Set([...aKeys, ...bKeys]);

    for (const key of uniqueKeys) {
      if (a[key] !== b[key]) return false;
    }

    return true;
  }

  return a === b;
};

/**
 * 객체 타입 여부를 확인하는 타입 가드 함수
 * @param obj 확인할 값
 * @returns 객체 타입이면 true, 아니면 false
 */
function isObject(val: unknown): val is Record<string, unknown> {
  return typeof val === "object" && val !== null;
}
