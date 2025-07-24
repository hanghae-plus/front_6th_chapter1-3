/**
 * 두 값이 얕은 비교(===)로 동일한지 확인합니다.
 * 객체와 배열의 경우 참조가 아닌 값 자체를 비교합니다.
 */
export const shallowEquals = (a: unknown, b: unknown) => {
  // 기본 동등성 체크
  if (a === b) {
    return true;
  }

  // null 체크
  if (a === null || b === null) {
    return false;
  }

  // 객체 타입 체크
  if (!isObject(a) || !isObject(b)) {
    return false;
  }

  // 배열 비교
  if (Array.isArray(a) && Array.isArray(b)) {
    return shallowEqualsArray(a, b);
  }

  // 객체 비교
  return shallowEqualsObject(a, b);
};

/**
 * 값이 객체인지 확인합니다 (null 제외)
 */
const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

/**
 * 두 배열을 얕은 비교로 확인합니다
 */
const shallowEqualsArray = (a: unknown[], b: unknown[]): boolean => {
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
};

/**
 * 두 객체를 얕은 비교로 확인합니다
 */
const shallowEqualsObject = (a: Record<string, unknown>, b: Record<string, unknown>): boolean => {
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!(key in b)) {
      return false;
    }

    if (a[key] !== b[key]) {
      return false;
    }
  }

  return true;
};
