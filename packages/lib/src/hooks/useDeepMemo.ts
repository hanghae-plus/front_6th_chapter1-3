import type { DependencyList } from "react";
import { useRef } from "./useRef";
import { deepEquals } from "../equals";

type MemoizedValue<T> = {
  deps: DependencyList;
  value: T;
};

export function useDeepMemo<T>(factory: () => T, deps: DependencyList): T {
  const memoRef = useRef<MemoizedValue<T> | null>(null);

  // deepEquals를 사용하여 의존성 배열의 깊은 비교 수행
  const hasDepsChanged = !memoRef.current || !deepEquals(deps, memoRef.current.deps);

  if (hasDepsChanged) {
    const newValue = factory();
    memoRef.current = { deps, value: newValue };
  }

  return memoRef.current!.value;
}
