export const isObject = (a: unknown): a is { [k: PropertyKey]: unknown } => {
  return a !== null && typeof a === "object";
};
