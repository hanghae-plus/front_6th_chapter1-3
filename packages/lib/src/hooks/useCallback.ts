/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import type { DependencyList } from "react";
import { useMemo } from "./useMemo";

/**
 * 콜백 함수를 메모이제이션하는 훅
 * @param factory 메모이제이션할 콜백 함수
 * @param _deps 의존성 배열
 * @returns 메모이제이션된 콜백 함수
 */
export function useCallback<T extends Function>(factory: T, _deps: DependencyList) {
  return useMemo(() => factory, _deps);
}
