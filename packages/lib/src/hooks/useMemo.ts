import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

type MemoState<T> = { deps: DependencyList | undefined; value: T } | null;
type EqualsFn = (a: unknown, b: unknown) => boolean;
type Factory<T> = () => T;

const isFirstRender = <T>(state: MemoState<T>): boolean => state === null;

const hasDepsChanged = <T>(state: MemoState<T>, newDeps: DependencyList, equals: EqualsFn): boolean =>
  state !== null && !equals(state.deps, newDeps);

const shouldRecalculate = <T>(state: MemoState<T>, deps: DependencyList, equals: EqualsFn): boolean =>
  isFirstRender(state) || hasDepsChanged(state, deps, equals);

const createMemoState = <T>(deps: DependencyList, value: T): MemoState<T> => ({
  deps,
  value,
});

const calculateAndCache = <T>(factory: Factory<T>, deps: DependencyList, stateRef: { current: MemoState<T> }): T => {
  const value = factory();
  stateRef.current = createMemoState(deps, value);
  return value;
};

const getCachedValue = <T>(state: MemoState<T>): T => state!.value;

export function useMemo<T>(factory: Factory<T>, deps: DependencyList, equals: EqualsFn = shallowEquals): T {
  const memoRef = useRef<MemoState<T>>(null);

  return shouldRecalculate(memoRef.current, deps, equals)
    ? calculateAndCache(factory, deps, memoRef)
    : getCachedValue(memoRef.current);
}
