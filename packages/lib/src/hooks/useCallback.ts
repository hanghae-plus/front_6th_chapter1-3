/* eslint-disable @typescript-eslint/no-unsafe-function-type,react-hooks/exhaustive-deps */
import type { DependencyList } from "react";
import { useMemo } from "./useMemo";

export function useCallback<T extends Function>(factory: T, _deps: DependencyList) {
  // useMemo로 factory를 메모이제이션해서 return
  return useMemo(() => factory, _deps) as T;
}
