import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

export function useMemo<T>(factory: () => T, deps: DependencyList | undefined, equals = shallowEquals): T {
  const memoizedRef = useRef<{ value: T; deps: DependencyList } | null>(null);

  if (!deps || !memoizedRef.current || !equals(memoizedRef.current.deps, deps)) {
    const newValue = factory();
    memoizedRef.current = { value: newValue, deps: deps || [] };
    return newValue;
  }

  return memoizedRef.current.value;
}
