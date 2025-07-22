import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

/**
 * useMemo 훅은 의존성이 변경되었을 때만 함수를 실행하여 메모이제이션된 값을 반환합니다.
 * @param factory 메모이제이션할 함수
 * @param _deps 의존성 배열
 * @param _equals 비교 함수
 * @returns 메모이제이션된 값
 */
export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  // 1. 이전 의존성과 결과를 저장할 ref 생성
  const ref = useRef<{ deps: DependencyList; result: T } | null>(null);
  if (!ref.current) ref.current = { deps: _deps, result: factory() };

  // 2. 현재 의존성과 이전 의존성 비교
  if (!_equals(ref.current.deps, _deps)) {
    // 3. 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
    ref.current.result = factory();
    ref.current.deps = _deps;
  }

  // 4. 메모이제이션된 값 반환
  return ref.current.result;
}
