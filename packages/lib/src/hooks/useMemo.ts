/* eslint-disable @typescript-eslint/no-unused-vars */
import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  const ref = useRef<{ deps: DependencyList; value: T } | null>(null);

  if (!ref.current) {
    ref.current = { deps: _deps, value: factory() };
    return ref.current.value;
  }

  const hasChanged = !_equals(ref.current.deps, _deps);
  if (hasChanged) {
    ref.current.deps = _deps;
    ref.current.value = factory();
  }

  return ref.current.value;
}
