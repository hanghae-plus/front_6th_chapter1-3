import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

type MemoizedValue<T> = {
  deps: DependencyList;
  value: T;
};

export function useMemo<T>(factory: () => T, deps: DependencyList, equals = shallowEquals): T {
  const memoRef = useRef<MemoizedValue<T> | null>(null);

  const depsChanged = !memoRef.current || !equals(deps, memoRef.current.deps);

  if (depsChanged) {
    const newValue = factory();
    memoRef.current = { deps, value: newValue };
  }

  return memoRef.current!.value;
}
