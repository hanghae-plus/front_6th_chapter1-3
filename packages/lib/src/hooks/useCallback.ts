/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

// 1. useMemo 사용한 버전
// export function useCallback<T extends Function>(factory: T, _deps: DependencyList) {
//   const memoizedFunction: T = useMemo(() => {
//     return factory;
//   }, _deps);

//   return memoizedFunction;
// }

// 2. useRef 사용한 버전 (useMemo 내부 로직과 동일)
export function useCallback<T extends Function>(factory: T, _deps: DependencyList) {
  const memoizedState = useRef<{ value: T; deps: DependencyList } | null>(null);

  if (!memoizedState.current || !shallowEquals(memoizedState.current.deps, _deps)) {
    memoizedState.current = {
      value: factory,
      deps: _deps,
    };
  }

  return memoizedState.current.value;
}
