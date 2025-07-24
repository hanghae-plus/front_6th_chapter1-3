export function hasOwn<T extends object>(obj: T, key: PropertyKey): key is keyof T {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export function isObject(value: unknown): value is object {
  return value !== null && typeof value === "object";
}
