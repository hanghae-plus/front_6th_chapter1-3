import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

type MemoState<T> = {
  value: T;
  deps: DependencyList;
};

export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  const memoRef = useRef<MemoState<T>>();

  // 캐시된 값이 있다면,
  if (memoRef.current) {
    const { value, deps } = memoRef.current;
    // 이전 의존성과 현재 의존성 얕은 비교
    if (_equals(deps, _deps)) {
      return value; // 캐시된 값 반환
    }
  }

  // 캐시된 값이 없다면,
  const value = factory();
  // 캐시에 저장하고, value 리턴
  memoRef.current = { value, deps: _deps };
  return value;
}
