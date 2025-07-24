export function deepEquals(objA: unknown, objB: unknown): boolean {
  if (objA === objB) return true;

  if (objA == null || objB == null || typeof objA !== "object" || typeof objB !== "object") return false;

  const keysOfA = Object.keys(objA);
  const keysOfB = Object.keys(objB);

  if (keysOfA.length !== keysOfB.length) return false;

  for (const key of keysOfA) {
    const valueA = (objA as Record<string, unknown>)[key];
    const valueB = (objB as Record<string, unknown>)[key];
    if (!deepEquals(valueA, valueB)) return false;
  }

  return true;
}
