import type { DependencyList } from "react";
import { useRef } from "./useRef";
import { shallowEquals } from "../equals";

// React.useCallback과 동일하게 extends Function이지만, lint 이슈로 인해 disable 주석 추가
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function useCallback<T extends Function>(factory: T, _deps: DependencyList) {
  const prevDepsRef = useRef<DependencyList | null>(null);
  const factoryRef = useRef<T | undefined>(undefined);

  if (prevDepsRef.current === null || !shallowEquals(prevDepsRef.current, _deps)) {
    prevDepsRef.current = _deps;
    factoryRef.current = factory;
  }

  return factoryRef.current as T;
}
