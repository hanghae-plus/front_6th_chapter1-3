/* eslint-disable @typescript-eslint/no-unsafe-function-type, react-hooks/exhaustive-deps */

import type { DependencyList } from "react";
import { useMemo } from "./useMemo";

export function useCallback<T extends Function>(factory: T, _deps: DependencyList) {
  return useMemo(() => factory, _deps);
}
