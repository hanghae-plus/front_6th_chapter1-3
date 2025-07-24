import type { DependencyList } from "react";
import { useRef } from "./useRef";
import { shallowEquals } from "../equals";

export function useMemo<T>(factory: () => T, deps: DependencyList, _equals = shallowEquals): T {
  const memoized = useRef<T | undefined>(undefined);
  const prevDeps = useRef(deps);
  const isInitial = useRef(true);

  if (isInitial.current || !_equals(prevDeps.current, deps)) {
    isInitial.current = false;
    memoized.current = factory();
    prevDeps.current = deps;
  }

  return memoized.current!;
}
