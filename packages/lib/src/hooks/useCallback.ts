/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-unsafe-function-type */
import type { DependencyList } from "react";
import { useMemo } from "./useMemo";

export function useCallback<T extends Function>(factory: T, _deps: DependencyList) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const result = useMemo(() => factory, _deps);

  return result as T;
}
