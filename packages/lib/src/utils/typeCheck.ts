export function isArray(a: unknown): a is unknown[] {
  return Array.isArray(a);
}

export function isObject(a: unknown): a is Record<string, unknown> {
  return typeof a === "object" && a !== null;
}
