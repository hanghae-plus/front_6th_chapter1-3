import type { DependencyList } from "react";
import { useRef } from "./useRef";
import { shallowEquals } from "../equals";

export function useCallback<T>(factory: T, deps: DependencyList): T {
  const callbackRef = useRef<T>(factory);
  const depsRef = useRef<DependencyList>(deps);

  // 의존성이 변경되었는지 확인
  if (!shallowEquals(deps, depsRef.current)) {
    callbackRef.current = factory;
    depsRef.current = deps;
  }

  return callbackRef.current;
}
