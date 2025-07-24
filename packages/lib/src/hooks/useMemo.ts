/* eslint-disable @typescript-eslint/no-unused-vars */
import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

type MemoState<T> = { deps: DependencyList | undefined; value: T } | null;
type EqualsFn = (a: unknown, b: unknown) => boolean;
type Factory<T> = () => T;

/*
코드 흐름
입력 (factory, deps, equals) 
    ↓
상태 검사 (shouldRecalculate)
    ↓
조건 분기 (재계산 vs 캐시 사용)
    ↓
결과 반환
*/

/** 첫 렌더링 체크 */
const isFirstRender = <T>(state: MemoState<T>): boolean => state === null;

/** 의존성 변경 체크 */
const hasDepsChanged = <T>(state: MemoState<T>, newDeps: DependencyList, equals: EqualsFn): boolean =>
  state !== null && !equals(state.deps, newDeps);

/**재계산 필요 여부 판단 */
const shouldRecalculate = <T>(state: MemoState<T>, deps: DependencyList, equals: EqualsFn): boolean =>
  isFirstRender(state) || hasDepsChanged(state, deps, equals);

/** 상태 생성 함수 */
const createMemoState = <T>(deps: DependencyList, value: T): MemoState<T> => ({
  deps,
  value,
});

/** 상태 계산 및 캐싱 함수 */
const calculateAndCache = <T>(factory: Factory<T>, deps: DependencyList, stateRef: { current: MemoState<T> }): T => {
  const value = factory();
  stateRef.current = createMemoState(deps, value);
  return value;
};

/** 이미 저장된 값 반환 -> shouldRecalculate가 false면 state는 절대 null이 아님 */
const getCachedValue = <T>(state: MemoState<T>): T => state!.value;

export function useMemo<T>(factory: Factory<T>, deps: DependencyList, equals: EqualsFn = shallowEquals): T {
  const memoRef = useRef<MemoState<T>>(null);

  /** 함수형 파이프라인: 조건 → 분기 → 결과 */
  return shouldRecalculate(memoRef.current, deps, equals)
    ? calculateAndCache(factory, deps, memoRef) // 🔄 재계산 경로
    : getCachedValue(memoRef.current); // ⚡ 캐시 경로
}
