import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

interface MemoCache<T> {
  deps: DependencyList | undefined;
  value: T;
}

export function useMemo<T>(factory: () => T, deps: DependencyList, equals = shallowEquals): T {
  const ref = useRef<MemoCache<T> | null>(null);

  if (ref.current?.deps && equals(ref.current.deps, deps)) return ref.current.value;

  ref.current = {
    deps: deps,
    value: factory(),
  };

  return ref.current.value;
}
