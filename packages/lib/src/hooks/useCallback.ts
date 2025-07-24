/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import type { DependencyList } from "react";
import { useRef } from "./useRef";
import { shallowEquals } from "../equals";

export function useCallback<T extends Function>(factory: T, _deps: DependencyList) {
  const memoizedDeps = useRef<DependencyList>(_deps);

  const memoizedValue = useRef<T | null>(null);

  if (!shallowEquals(memoizedDeps.current, _deps) || memoizedValue.current === null) {
    memoizedValue.current = factory;
  }

  memoizedDeps.current = _deps;

  return memoizedValue.current;
}
