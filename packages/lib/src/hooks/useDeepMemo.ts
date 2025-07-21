import type { DependencyList } from "react";

import { deepEquals } from "../equals";
import { useMemo as _useMemo } from "./useMemo"; // 린트 경고 방지를 위한 alias

export function useDeepMemo<T>(factory: () => T, deps: DependencyList) {
  return _useMemo(factory, deps, deepEquals);
}
