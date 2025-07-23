/**
 * 객체 타입 여부를 확인하는 타입 가드 함수
 * @param obj 확인할 값
 * @returns 객체 타입이면 true, 아니면 false
 */
export function isObject(val: unknown): val is Record<string, unknown> {
  return typeof val === "object" && val !== null;
}
