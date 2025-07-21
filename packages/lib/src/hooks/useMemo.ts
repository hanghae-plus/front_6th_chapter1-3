/* eslint-disable @typescript-eslint/no-unused-vars */
import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  const memoized = useRef(factory());
  const prevDeps = useRef(_deps);

  if (!_equals(prevDeps.current, _deps)) {
    memoized.current = factory();
    prevDeps.current = _deps;
  }

  return memoized.current;
}
