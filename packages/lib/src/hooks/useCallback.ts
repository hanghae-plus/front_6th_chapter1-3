import type { DependencyList } from "react";

import type { AnyFunction } from "../types";
import { useMemo as _useMemo } from "./useMemo"; // 린트 경고 방지를 위한 alias

export function useCallback<T extends AnyFunction>(factory: T, _deps: DependencyList) {
  return _useMemo(() => factory, _deps);
}
