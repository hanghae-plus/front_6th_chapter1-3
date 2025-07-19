import { Types } from "./types";

export const getType = (value: unknown) => {
  if (value === null) return Types.NULL;
  if (value === undefined) return Types.UNDEFINED;
  if (Array.isArray(value)) return Types.ARRAY;
  return typeof value;
};
