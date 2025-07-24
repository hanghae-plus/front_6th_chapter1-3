import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef"; // 직접 만든 useRef 사용

export function useMemo<T>(factory: () => T, deps: DependencyList, equals = shallowEquals): T {
  const ref = useRef<{ deps: DependencyList; value: T } | null>(null);

  if (ref.current === null || !equals(ref.current.deps, deps)) {
    ref.current = {
      deps,
      value: factory(),
    };
  }

  return ref.current.value;
}
