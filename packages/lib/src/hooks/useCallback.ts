/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-unsafe-function-type */
import type { DependencyList } from "react";
import { useMemo } from "./useMemo";

// factory - 실행할 함수
// _deps - 의존성 배열
export function useCallback<T extends Function>(factory: T, _deps: DependencyList) {
  return useMemo(() => factory, _deps);
}
