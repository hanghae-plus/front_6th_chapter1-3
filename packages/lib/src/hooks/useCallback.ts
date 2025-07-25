/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import type { DependencyList } from "react";
import { useMemo } from "./useMemo";

export function useCallback<T extends Function>(factory: T, _deps: DependencyList): T {
  // useMemo를 사용하여 함수를 메모이제이션
  return useMemo(() => factory, _deps);
}
