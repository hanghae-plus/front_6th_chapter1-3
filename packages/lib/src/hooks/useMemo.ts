/* eslint-disable @typescript-eslint/no-unused-vars */
import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  // 직접 작성한 useRef를 통해서 만들어보세요.

  // 1. 이전 의존성과 결과를 저장할 ref 생성
  const ref = useRef<{
    deps?: DependencyList;
    result?: T;
  }>({});

  // 2. 현재 의존성과 이전 의존성 비교
  // 3. 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
  if (!ref.current.deps || !_equals(ref.current.deps, _deps)) {
    ref.current.deps = _deps;
    ref.current.result = factory();
  }

  // 4. 메모이제이션된 값 반환
  return ref.current.result as T;
}
