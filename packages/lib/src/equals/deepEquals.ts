import { Types } from "../types";
import { getType } from "../utils";

// 배열 깊은 비교
const isDeepArrayEqual = (a: Array<unknown>, b: Array<unknown>) => {
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (!deepEquals(a[i], b[i])) return false;
  }

  return true;
};

// 객체 깊은 비교
const isDeepObjectEqual = (a: Record<string, unknown>, b: Record<string, unknown>) => {
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEquals(a[key], b[key])) return false;
  }

  return true;
};

export const deepEquals = (a: unknown, b: unknown) => {
  const typeA = getType(a);
  const typeB = getType(b);

  // 1. 타입이 다르면 다른 값
  if (typeA !== typeB) return false;

  // 2. 배열 비교
  if (typeA === Types.ARRAY) {
    return isDeepArrayEqual(a as Array<unknown>, b as Array<unknown>);
  }

  // 3. 객체 비교
  if (typeA === Types.OBJECT) {
    return isDeepObjectEqual(a as Record<string, unknown>, b as Record<string, unknown>);
  }

  // 4. 기본 타입 비교
  return a === b;
};
