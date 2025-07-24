import type { DependencyList } from "react";
import { useMemo } from "./useMemo";

// useCallback 은 useMemo 를 사용하여 함수를 메모이제이션 한다.
export function useCallback<T extends (...args: unknown[]) => unknown>(factory: T, deps: DependencyList): T {
  return useMemo(() => factory, deps);
}
