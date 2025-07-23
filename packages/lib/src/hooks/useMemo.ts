/* eslint-disable @typescript-eslint/no-unused-vars */
import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

/**
 * factory 함수와 의존성 배열, 비교 함수를 받아, 의존성 변경 시에만 결과값을 갱신하는 커스텀 훅
 *
 * @param factory 결과값을 생성하는 함수
 * @param _deps 의존성 배열
 * @param _equals 의존성 비교 함수(기본값: shallowEquals)
 * @returns 의존성(_equals 기준)이 변경될 때만 결과값을 갱신
 */
export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  // 1. useRef를 통해서 의존성과 factory 결과값을 저장
  const depsRef = useRef<DependencyList | null>(null);
  const resultRef = useRef<T | null>(null);

  // 2. 결과값이 없거나 의존성이 변경되었다면 재계산
  if (resultRef.current === null || !_equals(depsRef.current, _deps)) {
    depsRef.current = _deps;
    resultRef.current = factory();
  }

  // 3. 결과값을 반환 (무조건 계산을 수행하고 결과값을 반환하므로 as T로 변환)
  return resultRef.current as T;
}
