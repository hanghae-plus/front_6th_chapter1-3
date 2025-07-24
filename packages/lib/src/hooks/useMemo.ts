import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

/**
 * useMemo - 계산 비용이 높은 값을 메모이제이션합니다.
 *
 * @param factory 메모이제이션할 값을 계산하는 함수
 * @param _deps 의존성 배열
 * @param _equals 의존성 비교 함수 (기본값: shallowEquals)
 * @returns 메모이제이션된 값
 */
export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  // 이전 의존성과 계산 결과를 저장할 캐시
  const cache = useRef<{ deps: DependencyList | null; result: T | null }>({
    deps: null,
    result: null,
  });

  // 의존성 변경 여부 확인
  const prevDeps = cache.current.deps;
  const hasChanged = prevDeps === null || !_equals(prevDeps, _deps);

  // 의존성이 변경된 경우에만 factory 함수 실행
  if (hasChanged) {
    const newResult = factory();
    cache.current = {
      deps: _deps,
      result: newResult,
    };
  }

  return cache.current.result!;
}
