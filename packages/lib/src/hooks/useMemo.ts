/* eslint-disable @typescript-eslint/no-unused-vars */
import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

/**
 * 계산 비용이 높은 값을 메모이제이션합니다.
 *
 * @param factory - 메모이제이션할 값을 계산하는 함수
 * @param deps - 의존성 배열
 * @param equals - 의존성 비교에 사용할 함수 (기본값: shallowEquals)
 * @returns 메모이제이션된 값
 */
export function useMemo<T>(factory: () => T, deps: DependencyList, equals = shallowEquals): T {
  // 이전 의존성과 계산 결과를 저장할 ref
  const ref = useRef<{ deps: DependencyList; value: T } | null>(null);

  // 첫 호출이거나 의존성이 변경된 경우 재계산
  if (ref.current === null || !equals(ref.current.deps, deps)) {
    const value = factory();
    ref.current = { deps, value }; // 새 의존성과 결과 저장
  }

  // 메모이제이션된 값 반환
  return ref.current.value;
}
