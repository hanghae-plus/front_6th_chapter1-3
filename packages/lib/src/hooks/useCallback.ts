/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-unsafe-function-type */
import type { DependencyList } from "react";
import { useMemo } from "./useMemo";

/**
 * 함수를 메모이제이션합니다.
 *
 * @param factory - 메모이제이션할 함수
 * @param deps - 의존성 배열
 * @returns 메모이제이션된 함수
 */
export function useCallback<T extends Function>(factory: T, deps: DependencyList): T {
  // useMemo를 사용해서 함수 자체를 메모이제이션
  return useMemo(() => factory, deps);
}
