import type { DependencyList } from "react";
import { useRef } from "./useRef";
import { shallowEquals } from "../equals";

type MemoizedState<T> = {
  value: T;
  deps: DependencyList;
};

function hasDependenciesChanged<T>(
  prev: MemoizedState<T> | null,
  deps: DependencyList,
  equals: (a: DependencyList, b: DependencyList) => boolean,
): boolean {
  return prev === null || !equals(prev.deps, deps);
}

function computeMemoized<T>(
  prev: MemoizedState<T> | null,
  factory: () => T,
  deps: DependencyList,
  equals: (a: DependencyList, b: DependencyList) => boolean,
): MemoizedState<T> {
  if (hasDependenciesChanged(prev, deps, equals)) {
    return { value: factory(), deps };
  }
  return prev!;
}

export function useMemo<T>(factory: () => T, deps: DependencyList, equals = shallowEquals): T {
  const ref = useRef<MemoizedState<T> | null>(null);
  ref.current = computeMemoized(ref.current, factory, deps, equals);
  return ref.current.value;
}
