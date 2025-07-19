import { baseEquals } from "./baseEquals";

export const deepEquals = (a: unknown, b: unknown) => baseEquals(a, b, deepEquals);
