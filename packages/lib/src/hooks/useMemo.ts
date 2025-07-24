import { useRef } from "react";
import type { DependencyList } from "react";
import { shallowEquals } from "../equals";

export function useMemo<T>(factory: () => T, deps: DependencyList, equals = shallowEquals): T {
  const memoRef = useRef<{ value: T; deps: DependencyList } | null>(null);

  if (memoRef.current === null || !equals(memoRef.current.deps, deps)) {
    // deps 가 바뀌었다고 판단되면 새로 계산하고 저장한다.
    memoRef.current = {
      value: factory(),
      deps,
    };
  }

  return memoRef.current.value;
}
