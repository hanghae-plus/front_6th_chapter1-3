import { type DependencyList } from "react";

import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

type MemoRef<T> = {
  deps: DependencyList;
  value: T;
};

export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals) {
  // useRef로 메모이제이션 상태 저장
  const memoRef = useRef<MemoRef<T> | null>(null);

  // 의존성 배열이 없거나, 이전과 다르면 새로 계산
  if (!memoRef.current || !_equals(memoRef.current.deps, _deps)) {
    const value = factory();
    memoRef.current = { deps: _deps, value };
  }

  return memoRef.current.value;
}
