import type { DependencyList } from "react";
import { useMemo } from "./useMemo.ts";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function useCallback<T extends Function>(factory: T, _deps: DependencyList) {
  return useMemo(() => factory, _deps);
}
