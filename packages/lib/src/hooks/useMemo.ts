import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  const memoizedDeps = useRef<DependencyList>(_deps);

  const memoizedValue = useRef<T | null>(null);

  if (!_equals(memoizedDeps.current, _deps) || memoizedValue.current === null) {
    memoizedValue.current = factory();
  }

  memoizedDeps.current = _deps;

  return memoizedValue.current;
}
