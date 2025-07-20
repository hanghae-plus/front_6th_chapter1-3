const isArray = (value: unknown) => {
  return Array.isArray(value);
};

const isObject = (value: unknown) => {
  return typeof value === "object" && value !== null;
};

const compareArraysDeep = (a: unknown[], b: unknown[]) => {
  return a.length === b.length && a.every((item, index) => deepEquals(item, b[index]));
};

const compareObjectsDeep = (a: object, b: object) => {
  const aObj = a as Record<string, unknown>;
  const bObj = b as Record<string, unknown>;

  const keysA = Object.keys(aObj);
  const keysB = Object.keys(bObj);

  return keysA.length === keysB.length && keysA.every((key) => key in bObj && deepEquals(aObj[key], bObj[key]));
};

/**
 * 두 값의 깊은 비교를 수행 (리팩토링 버전)
 *
 * - 기본 타입 값들을 정확히 비교해야 한다
 * - 배열을 정확히 비교해야 한다
 * - 객체를 정확히 비교해야 한다
 * - 중첩된 구조를 정확히 비교해야 한다
 */
export const deepEquals = (a: unknown, b: unknown): boolean => {
  // 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (Object.is(a, b)) return true;

  // 둘 다 객체가 아니면 false
  if (!isObject(a) || !isObject(b)) return false;

  // 서로 다른 타입을 받을 경우 false (ex: a: [], b: {} 인 경우 false)
  if (isArray(a) !== isArray(b)) return false;

  // 둘 다 배열이면 배열 비교
  if (isArray(a) && isArray(b)) return compareArraysDeep(a, b);

  // 둘 다 객체면 객체 비교
  return compareObjectsDeep(a, b);
};
