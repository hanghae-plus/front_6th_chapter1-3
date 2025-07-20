const isArray = (value: unknown) => {
  return Array.isArray(value);
};

const isObject = (value: unknown) => {
  return typeof value === "object" && value !== null;
};

const compareArrays = (a: unknown[], b: unknown[]) => {
  return a.length === b.length && a.every((item, index) => Object.is(item, b[index]));
};

const compareObjects = (a: object, b: object) => {
  const aObj = a as Record<string, unknown>;
  const bObj = b as Record<string, unknown>;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  return keysA.length === keysB.length && keysA.every((key) => key in bObj && Object.is(aObj[key], bObj[key]));
};

/**
 * 두 값의 얕은 비교를 수행
 *
 * - 기본 타입 값들을 정확히 비교해야 한다
 * - 배열을 얕게 비교해야 한다
 * - 중첩된 구조를 깊게 비교하지 않아야 한다
 */
export const shallowEquals = (a: unknown, b: unknown) => {
  // 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (Object.is(a, b)) return true;

  // 둘 다 객체가 아니면 false
  if (!isObject(a) || !isObject(b)) return false;

  // 서로다른 타입을 받을 경우 false (ex: a: [], b: {} 인 경우 false)
  if (isArray(a) !== isArray(b)) return false;

  // 둘 다 배열이면 배열 비교
  if (isArray(a) && isArray(b)) return compareArrays(a, b);

  // 둘 다 객체면 객체 비교
  return compareObjects(a, b);
};
