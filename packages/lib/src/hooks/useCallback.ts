import type { DependencyList } from "react";
import { useMemo } from "./useMemo";

export function useCallback<T extends (...args: unknown[]) => unknown>(factory: T, deps: DependencyList) {
  const memoized = useMemo(() => factory, [...deps]);

  return memoized;
}
