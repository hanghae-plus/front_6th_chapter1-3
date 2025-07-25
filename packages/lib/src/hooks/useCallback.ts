/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DependencyList } from "react";
import { useMemo } from "./useMemo";

export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: DependencyList): T {
  return useMemo(() => callback, deps);
}
