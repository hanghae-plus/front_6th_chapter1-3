import { baseEquals } from "./baseEquals";

export const shallowEquals = (a: unknown, b: unknown) => baseEquals(a, b, Object.is);
