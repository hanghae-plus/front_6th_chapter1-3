/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import type { DependencyList } from "react";
import { useMemo } from "./useMemo";

// useCallback은 메모이제이션된 콜백 함수를 반환하는 Hook입니다.
export function useCallback<T extends Function>(factory: T, deps: DependencyList): T {
  return useMemo(() => factory, deps);
}
