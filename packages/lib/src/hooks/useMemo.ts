import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  const ref = useRef<{
    deps: DependencyList | undefined;
    value: T | undefined;
  }>({
    deps: undefined,
    value: undefined,
  });

  const shouldRecompute = !ref.current.deps || !_equals(ref.current.deps, _deps);

  if (shouldRecompute) {
    ref.current.deps = _deps;
    ref.current.value = factory();
  }

  return ref.current.value!;
}
