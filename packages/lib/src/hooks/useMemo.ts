import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef.ts";

export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  // 메모이제이션 된 함수의 결과
  const memoizedValueRef = useRef<T | null>(null);
  // 의존성
  const depsRef = useRef<DependencyList | null>(null);

  // 초기 실행이거나 의존성이 변경되었을 때만 함수를 재생성한다.
  if (depsRef.current === null || (_deps.length > 0 && !_equals(depsRef.current, _deps))) {
    try {
      // factory 함수 실행 결과를 캐싱한다.
      memoizedValueRef.current = factory();
      // 의존성을 업데이트한다.
      depsRef.current = _deps;
    } catch (error) {
      console.error("메모이제이션 실패:", error);
    }
  }

  // 메모이제이션 된 함수가 null이면 예외를 발생시킨다.
  if (memoizedValueRef.current === null) {
    throw new Error("메모이제이션 실패");
  }

  // 메모이제이션 된 함수를 반환한다.
  return memoizedValueRef.current;
}
