/* eslint-disable @typescript-eslint/no-unused-vars */
import type { DependencyList } from "react";
import { useRef } from "./useRef";
import { shallowEquals } from "../equals";

// factory - 계산할 함수
// _deps - 의존성 배열
// _equals - 의존성 배열 비교 함수
// useRef - 저장된 배열과 새로운 배열을 비교
export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  const ref = useRef<{ deps: DependencyList; currentValue: T | undefined }>({
    deps: [],
    currentValue: undefined,
  });

  if (_equals(ref.current.deps, _deps)) {
    return ref.current.currentValue as T;
  }

  const nextValue = factory();
  ref.current.deps = _deps;
  ref.current.currentValue = nextValue;

  return nextValue;
}
