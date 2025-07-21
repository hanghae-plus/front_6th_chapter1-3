import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  // 직접 작성한 useRef를 통해서 만들어보세요.

  // 의존성 배열과 값을 저장하는 객체를 useRef로 관리
  const ref = useRef<{ deps: DependencyList; value: T } | null>(null);

  // 의존성 배열이 바뀌었거나, 값이 바뀌었으면 factory 실행해서 값 저장
  if (ref.current === null || !_equals(ref.current.deps, _deps)) {
    const value = factory();
    ref.current = { deps: _deps, value };
  }

  return ref.current.value;
}
