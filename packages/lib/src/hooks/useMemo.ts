import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  const valueRef = useRef<T>(null);
  const depsRef = useRef<DependencyList>(null);

  if (!depsRef.current || !_equals(_deps, depsRef.current)) {
    valueRef.current = factory();
    depsRef.current = _deps;
  }

  return valueRef.current as T;
}
