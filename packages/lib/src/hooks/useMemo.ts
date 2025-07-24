import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  // 단 한 번만 초기화. 컴포넌트가 사라지기 전까지 유지.
  const memoizedRef = useRef<{ deps: DependencyList; result: T } | null>(null);

  if (memoizedRef.current === null || !_equals(memoizedRef.current.deps, _deps)) {
    // 만약 새로운 값으로 업데이트 해야한다면 랜더링을 유발하지 않는 방식으로..
    memoizedRef.current = { deps: _deps, result: factory() };
  }
  // 마지막엔 저장된 result 반환
  return memoizedRef.current.result;
}
