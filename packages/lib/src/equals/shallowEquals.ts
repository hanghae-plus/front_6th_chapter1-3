import { baseEquals } from "./baseEquals";

export const shallowEquals = (a: unknown, b: unknown) => {
  // baseEquals를 사용하여 공통 로직 처리, 값 비교는 얕은 비교(=== 사용)
  return baseEquals(a, b, (valueA, valueB) => valueA === valueB);
};
