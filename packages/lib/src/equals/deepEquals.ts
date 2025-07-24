import { baseEquals } from "./baseEquals";

export const deepEquals = (a: unknown, b: unknown): boolean => {
  // baseEquals를 사용하여 공통 로직 처리, 값 비교는 깊은 비교(재귀 호출)
  return baseEquals(a, b, (valueA, valueB) => deepEquals(valueA, valueB));
};
