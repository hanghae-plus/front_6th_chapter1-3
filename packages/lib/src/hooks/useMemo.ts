import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  const ref = useRef<{ value: T; deps: DependencyList } | null>(null);

  if (ref.current === null || !_equals(ref.current.deps, _deps)) {
    ref.current = {
      value: factory(),
      deps: _deps,
    };
  }

  return ref.current.value;
}
