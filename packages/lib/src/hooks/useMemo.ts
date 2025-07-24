import { type DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  // 직접 작성한 useRef를 통해서 만들어보세요.
  const ref = useRef<{
    value: T;
    deps: DependencyList;
  }>();

  if (!ref.current || !_equals(_deps, ref.current.deps)) {
    ref.current = {
      value: factory(),
      deps: _deps,
    };
  }

  return ref.current.value;
}
