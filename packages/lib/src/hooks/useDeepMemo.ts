/* eslint-disable react-hooks/exhaustive-deps */
import type { DependencyList } from "react";
import { useMemo } from "./useMemo";
import { deepEquals } from "../equals";

/**
 * useDeepMemo 훅은 의존성이 변경되었을 때만 함수를 실행하여 깊은 비교를 수행한 메모이제이션된 값을 반환합니다.
 * @param factory 메모이제이션할 함수
 * @param deps 의존성 배열
 * @returns 메모이제이션된 값
 */
export function useDeepMemo<T>(factory: () => T, deps: DependencyList): T {
  // 1. useMemo를 사용하되, 비교 함수로 deepEquals를 사용
  return useMemo(factory, deps, deepEquals);
}
