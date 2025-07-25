import { type DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  // 직접 작성한 useRef를 통해서 만들어보세요.
  // 1. 이전 의존성과 결과를 저장할 ref 생성
  const ref = useRef<{ value: T; deps: DependencyList } | null>(null);

  // 2. 현재 의존성과 이전 의존성 비교
  const currentDeps = _deps;
  const prevDeps = ref.current?.deps;
  const isSameDeps = prevDeps && _equals(currentDeps, prevDeps);

  // 3. 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
  if (!isSameDeps || !ref.current) {
    ref.current = {
      value: factory(),
      deps: _deps,
    };
  }

  // 4. 메모이제이션된 값 반환
  return ref.current.value;
}
