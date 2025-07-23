/* eslint-disable @typescript-eslint/no-unsafe-function-type,react-hooks/exhaustive-deps */
import type { DependencyList } from "react";
import { useMemo } from "./useMemo";

export function useCallback<T extends Function>(factory: T, _deps: DependencyList) {
  // 직접 작성한 useMemo를 통해서 만들어보세요.
  return useMemo(() => factory, _deps);
}
