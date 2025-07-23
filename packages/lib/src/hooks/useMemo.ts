import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

export function useMemo<T>(factory: () => T, deps: DependencyList, equals = shallowEquals): T {
  const prevDepsRef = useRef<DependencyList | null>(null);
  const valueRef = useRef<T | undefined>(undefined);

  if (prevDepsRef.current === null || !equals(prevDepsRef.current, deps)) {
    prevDepsRef.current = deps;
    valueRef.current = factory();
  }

  // 최초 렌더링이 아니므로 undefined가 아닌 value의 리턴이 보장됨
  return valueRef.current as T;
}
