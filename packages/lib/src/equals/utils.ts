export const isNullish = (value: unknown): value is null | undefined => value == null;
export const isArray = (value: unknown): value is unknown[] => Array.isArray(value);
export const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;
export const isSameValue = (a: unknown, b: unknown) => a === b;
