/**
 * 값이 null 또는 undefined인지 확인하는 타입가드
 */
export const isNullish = (value: unknown): value is null | undefined => {
  return value === null || value === undefined;
};

/**
 * 값이 primitive 타입인지 확인하는 타입가드
 */
export const isPrimitive = (
  value: unknown,
): value is string | number | boolean | null | undefined | symbol | bigint => {
  return value === null || typeof value !== "object";
};

/**
 * 값이 객체 타입인지 확인하는 타입가드 (null 제외)
 */
export const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

/**
 * 값이 배열인지 확인하는 타입가드
 */
export const isArray = (value: unknown): value is unknown[] => {
  return Array.isArray(value);
};

/**
 * 값이 객체 또는 배열인지 확인하는 타입가드
 */
export const isObjectLike = (value: unknown): value is Record<string, unknown> | unknown[] => {
  return typeof value === "object" && value !== null;
};

/**
 * 두 값의 타입이 같은지 확인하는 헬퍼 함수
 */
export const isSameType = (a: unknown, b: unknown): boolean => {
  if (isNullish(a) && isNullish(b)) return true;
  if (isPrimitive(a) && isPrimitive(b)) return typeof a === typeof b;
  if (isArray(a) && isArray(b)) return true;
  if (isObject(a) && isObject(b)) return true;
  return false;
};
