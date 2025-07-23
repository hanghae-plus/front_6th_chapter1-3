/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-unsafe-function-type */
import type { DependencyList } from "react";
import { useRef } from "./useRef";
import { shallowEquals } from "../equals";

/**
 * factory 함수와 의존성 배열을 받아, 의존성이 변경될 때만 새로운 함수를 반환하는 커스텀 훅
 *
 * @param factory 생성할 함수
 * @param _deps 의존성 배열
 * @returns 의존성 변경 시에만 갱신되는 함수 참조
 */
export function useCallback<T extends Function>(factory: T, _deps: DependencyList) {
  // 1. useRef를 통해서 의존성과 factory 함수를 저장
  const depsRef = useRef<DependencyList | null>(null);
  const funcRef = useRef<T | null>(null);

  // 2. 함수가 없거나 의존성이 변경되었다면 재계산
  if (depsRef.current === null || !shallowEquals(depsRef.current, _deps)) {
    depsRef.current = _deps;
    funcRef.current = factory;
  }

  // 3. 함수를 반환 (무조건 계산을 수행하고 함수를 반환하므로 as T로 변환)
  return funcRef.current as T;
}
