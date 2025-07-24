import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  const ref = useRef<{
    deps: DependencyList;
    value: T;
  } | null>(null);

  const sameDeps = () => _equals(ref.current?.deps, _deps);
  const refNull = ref.current === null;

  if (refNull || !sameDeps()) {
    const value = factory();
    ref.current = {
      deps: _deps,
      value,
    };

    return value;
  }

  return ref.current!.value;
}
