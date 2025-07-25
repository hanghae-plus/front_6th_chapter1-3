import type { DependencyList } from "react";

import { useRef } from "./useRef";
import { shallowEquals } from "../equals";

export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  // 직접 작성한 useRef를 통해서 만들어보세요.

  const valueRef = useRef<T | undefined>(undefined);
  const depsRef = useRef<DependencyList | undefined>(undefined);

  // 첫 번째 렌더링이거나 의존성이 변경된 경우
  if (depsRef.current === undefined || !_equals(depsRef.current, _deps)) {
    depsRef.current = _deps;
    valueRef.current = factory();
  }

  return valueRef.current as T;
}
