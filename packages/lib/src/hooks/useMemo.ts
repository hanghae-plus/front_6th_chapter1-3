import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

// useMemo 훅은 계산 비용이 높은 값을 메모이제이션합니다.
export function useMemo<T>(factory: () => T, deps: DependencyList, equals = shallowEquals): T {
  // 1. 이전 의존성과 결과를 저장할 ref 생성
  const memoRef = useRef<{ value: T; deps: DependencyList } | undefined>(undefined);

  // 2. 현재 의존성과 이전 의존성 비교
  // 3. 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
  if (!memoRef.current || !equals(deps, memoRef.current.deps)) {
    memoRef.current = {
      value: factory(),
      deps: deps,
    };
  }
  // 4. 메모이제이션된 값 반환
  return memoRef.current.value;
}
