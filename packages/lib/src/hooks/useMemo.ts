import { type DependencyList } from "react";
import { shallowEquals } from "../equals";

import { useRef } from "./useRef";

export function useMemo<T>(factory: () => T, deps: DependencyList, equals = shallowEquals): T {
  // 이전 의존성과 계산된 값을 저장하는 ref
  const ref = useRef<{ deps: DependencyList | undefined; value: T }>({
    deps: undefined,
    value: undefined as T,
  });

  // 의존성이 변경되었는지 확인
  const depsChanged = ref.current.deps === undefined || !equals(ref.current.deps, deps);

  // 의존성이 변경되었으면 새로 계산
  if (depsChanged) {
    ref.current.value = factory();
    ref.current.deps = deps;
  }

  // 메모이제이션된 값 반환
  return ref.current.value;
}
