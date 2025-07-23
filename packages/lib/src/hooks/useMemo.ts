import type { DependencyList } from "react";
import { useRef } from "./useRef";
import { shallowEquals } from "../equals";

export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  const ref = useRef<{
    deps: DependencyList;
    value: T | undefined;
    initialized: boolean;
  }>({
    deps: [],
    value: undefined,
    initialized: false,
  });

  if (!ref.current.initialized || !_equals(ref.current.deps, _deps)) {
    ref.current.value = factory();
    ref.current.deps = _deps;
    ref.current.initialized = true;
  }

  return ref.current.value as T;
}
