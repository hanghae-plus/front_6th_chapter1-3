/* eslint-disable @typescript-eslint/no-unused-vars */
import type { DependencyList } from "react";
import { useRef } from "./useRef";
import { shallowEquals } from "../equals";

// factory - 실행할 함수
// _deps - 의존성 배열
// _equals - 의존성 배열 비교 함수
// useRef - 저장된 배열과 새로운 배열을 비교
export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  const depsRef = useRef<DependencyList>([]);
  const valueRef = useRef<T | null>(null);

  if (valueRef.current !== null && _equals(depsRef.current, _deps)) {
    return valueRef.current;
  }

  const nextValue = factory();
  depsRef.current = _deps;
  valueRef.current = nextValue;

  return nextValue;
}
