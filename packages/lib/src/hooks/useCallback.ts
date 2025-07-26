/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import type { DependencyList } from "react";
import { useMemo } from "./useMemo";
import { shallowEquals } from "../equals";

export function useCallback<T extends Function>(factory: T, _deps: DependencyList, _equals = shallowEquals) {
  return useMemo<T>(() => factory, _deps, _equals);
}
