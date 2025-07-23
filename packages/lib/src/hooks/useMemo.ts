import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef"; // 내가 만든 useRef

export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  const memoRef = useRef<{
    deps: DependencyList;
    value: T;
  } | null>(null);

  if (
    memoRef.current === null || // 최초 실행
    !_equals(memoRef.current.deps, _deps) // 의존성 변경됨
  ) {
    memoRef.current = {
      deps: _deps,
      value: factory(),
    };
  }

  return memoRef.current.value;
}
