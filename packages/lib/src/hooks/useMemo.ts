import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  // 직접 작성한 useRef를 통해서 만들어보세요! 이게 제일 중요합니다.

  // 1. 이전 의존성과 결과를 저장할 ref 생성
  // undefined는 첫 렌더
  // resultRef는 factory()의 실행결과 저장
  const depsRef = useRef<DependencyList | undefined>(undefined);
  const resultRef = useRef<T | undefined>(undefined);

  // 2. 현재 의존성과 이전 의존성 비교
  // 초기 렌더링이거나, 이전 의존성과 현재 의존성이 다르면 새로 메모이제이션 -> factory() 실행
  // 3. 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
  if (depsRef.current === undefined || !_equals(depsRef.current, _deps)) {
    depsRef.current = _deps;
    resultRef.current = factory();
  }

  // 4. 메모이제이션된 값 반환
  return resultRef.current as T;
}
