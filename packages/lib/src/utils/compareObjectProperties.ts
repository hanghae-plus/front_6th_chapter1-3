import { type ObjectType } from "../types";

type Equals = (a: unknown, b: unknown) => boolean;

export const compareObjectProperties = (a: ObjectType, b: ObjectType, equals: Equals) => {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) return false;

  return aKeys.every((key) => equals(a[key], b[key]));
};
