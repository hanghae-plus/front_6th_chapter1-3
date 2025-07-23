import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks/useRef";

export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  const prevRef = useRef<DependencyList | null>(null);
  const currentRef = useRef<T | null>(null);

  if (prevRef.current === null || !_equals(prevRef.current, _deps)) {
    prevRef.current = _deps;
    currentRef.current = factory();
  }

  return currentRef.current as T;
}
