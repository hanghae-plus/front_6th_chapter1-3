import type { DependencyList } from "react";
import { useMemo } from "./useMemo";
import type { AnyFunction } from "../types";

export function useCallback<T extends AnyFunction>(callback: T, deps: DependencyList): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => callback, deps);
}
