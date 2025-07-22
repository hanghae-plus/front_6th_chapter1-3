/**
 * 주어진 값이 객체인지 확인
 * @param {unknown} value - 객체인지 확인할 값
 * @returns {value is Record<string, unknown>} 객체인지 확인 결과
 */
export function isObject(value?: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object";
}
