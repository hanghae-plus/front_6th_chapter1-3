import { baseEquals } from "./baseEquals";

export const shallowEquals = (a: unknown, b: unknown) => {
  return baseEquals(a, b, (valueA, valueB) => valueA === valueB);
};
