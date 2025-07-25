import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  const valueRef = useRef<T | null>(null);
  const depsRef = useRef<DependencyList>([]);

  if (valueRef.current === null || !_equals(depsRef.current, _deps)) {
    // 변경되었거나 첫 렌더링인 경우 factory 실행하고 결과 저장
    valueRef.current = factory();
    depsRef.current = _deps;
  }

  return valueRef.current;
}
