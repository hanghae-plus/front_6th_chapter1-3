import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  const data = useRef<{ deps: DependencyList | null; func: T | null }>({
    deps: null,
    func: null,
  });

  const prevDeps = data.current.deps;
  if (prevDeps === null || !_equals(prevDeps, _deps)) {
    data.current.deps = _deps;
    data.current.func = factory();
  }
  return data.current.func as T;
}

// 직접 작성한 useRef를 통해서 만들어보세요! 이게 제일 중요합니다.

// 1. 이전 의존성과 결과를 저장할 ref 생성

// 2. 현재 의존성과 이전 의존성 비교

// 3. 의존성이 변경된 경우 factory 함수 실행 및 결과 저장

// 4. 메모이제이션된 값 반환

// 구현을 완성해주세요.

// 값을 기억해서 리렌더링 시 불필요한 계산을 피하는 훅
