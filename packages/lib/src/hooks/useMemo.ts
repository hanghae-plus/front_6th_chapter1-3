/* eslint-disable @typescript-eslint/no-unused-vars */
import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  const depsRef = useRef<DependencyList | null>(null);
  const resultRef = useRef<T | null>(null);

  // 의존성 비교
  if (depsRef.current === null || !_equals(depsRef.current, _deps)) {
    depsRef.current = _deps;
    resultRef.current = factory();
  }

  return resultRef.current as T;
}
