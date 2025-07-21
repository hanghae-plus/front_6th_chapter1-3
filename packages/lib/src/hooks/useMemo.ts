import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  // value와 deps를 함께 보존할 ref
  const memoRef = useRef<{ value: T; deps: DependencyList } | null>(null);

  if (memoRef.current === null || !_equals(memoRef.current.deps, _deps)) {
    memoRef.current = { value: factory(), deps: _deps };
  }

  return memoRef.current.value;
}
