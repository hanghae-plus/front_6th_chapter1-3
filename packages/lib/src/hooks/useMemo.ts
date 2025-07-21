/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, type DependencyList } from "react";
import { shallowEquals } from "../equals";

export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  const prevDepsRef = useRef<DependencyList>(null);
  const valueRef = useRef<T>(null);

  if (!prevDepsRef.current || !_equals(_deps, prevDepsRef.current)) {
    valueRef.current = factory();
    prevDepsRef.current = _deps;
  }

  return valueRef.current!;
}
