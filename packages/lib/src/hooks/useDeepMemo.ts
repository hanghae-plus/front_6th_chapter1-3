import type { DependencyList } from "react";
import { useMemo } from "./useMemo";
import { deepEquals } from "../equals";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

export function useDeepMemo<T>(factory: () => T, deps: DependencyList): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, deps, deepEquals);
}
