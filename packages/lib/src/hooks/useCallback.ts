import type { DependencyList } from "react";
import type { AnyFunction } from "../types";
import { useMemo } from "./useMemo";

export function useCallback<T extends AnyFunction>(factory: T, _deps: DependencyList) {
  // 직접 작성한 useMemo를 통해서 만들어보세요.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => factory, _deps);
}
