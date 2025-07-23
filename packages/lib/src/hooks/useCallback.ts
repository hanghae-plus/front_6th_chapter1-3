/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-unsafe-function-type */
import type { DependencyList } from "react";
import { useMemo } from "./useMemo";

export function useCallback<T extends Function>(factory: T, _deps: DependencyList) {
  return useMemo(() => factory, _deps) as T;
}
