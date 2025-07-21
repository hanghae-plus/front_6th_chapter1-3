import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  // 직접 작성한 useRef를 통해서 만들어보세요.

  const ref = useRef<{ value: T; deps: DependencyList }>();

  if (!ref.current || !_equals(ref.current.deps, _deps)) {
    // deps가 다르거나 처음 실행이면 새로 생성
    ref.current = {
      value: factory(),
      deps: _deps,
    };
  }

  return ref.current.value;
}
