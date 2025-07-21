/* eslint-disable react-hooks/exhaustive-deps */
import type { DependencyList } from "react";
import { useMemo } from "./useMemo";
import type { AnyFunction } from "../types";

export function useCallback<T extends AnyFunction>(factory: T, deps: DependencyList): T {
  const memoized = useMemo(() => factory, [...deps]);

  return memoized;
}
