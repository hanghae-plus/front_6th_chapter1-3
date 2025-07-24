import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef.ts";

export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  const prevDepsRef = useRef<DependencyList | undefined>(undefined);
  const memoizedValueRef = useRef<T | undefined>(undefined);

  // 이전 deps가 없거나 이전 deqs가 있고, 현재 deps와 다르다면 다시 계산하기
  if (prevDepsRef.current === undefined || !_equals(prevDepsRef.current, _deps)) {
    memoizedValueRef.current = factory();
    prevDepsRef.current = _deps;
  }

  return memoizedValueRef.current as T;
}
