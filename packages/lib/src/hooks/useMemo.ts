import type { DependencyList } from "react";
import { useRef } from "./useRef";
import { shallowEquals } from "../equals";

export function useMemo<T>(factory: () => T, deps: DependencyList, equals = shallowEquals): T {
  const ref = useRef<T | null>(null);
  const depsRef = useRef<DependencyList | null>(null);

  if (ref.current === null || !equals(depsRef.current, deps)) {
    ref.current = factory();
    depsRef.current = deps;
  }

  return ref.current;
}
