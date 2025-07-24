/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-unsafe-function-type */
import type { DependencyList } from "react";
import { useMemo } from "./useMemo";

// 의존성에 따라 참조를 유지하는 함수
export function useCallback<T extends Function>(factory: T, _deps: DependencyList) {
  // 함수를 메모한다.
  return useMemo(() => factory, _deps);
}
