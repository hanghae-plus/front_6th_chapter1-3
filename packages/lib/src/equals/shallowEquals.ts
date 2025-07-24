import { deepEquals } from "./deepEquals";

export function shallowEquals<T>(a: T, b: T) {
  return deepEquals(a, b, 1);
}
