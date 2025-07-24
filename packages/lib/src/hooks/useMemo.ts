import { useRef, type DependencyList } from "react";
// DependencyList는 React의 useEffect, useMemo, useCallback 등에서 사용하는 "의존성 배열"의 타입 의미
import { shallowEquals } from "../equals";

// useMemo 훅은 계산 비용이 높은 값을 메모이제이션 합니다.
export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  // 1. 이전 의존성과 결과를 저장할 ref 생성
  const prevDeps = useRef<DependencyList>([]);
  const prevResult = useRef<T | null>(null);

  // 2. 현재 의존성과 이전 의존성 비교
  if (prevResult.current === null || !_equals(prevDeps.current, _deps)) {
    // 3. 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
    prevDeps.current = _deps;
    prevResult.current = factory();
  }

  // 4. 메모이제이션된 값 반환
  return prevResult.current;
}
