import type { createStore } from "../createStore";
import { useSyncExternalStore } from "react";
import { useShallowSelector } from "./useShallowSelector";

type Store<T> = ReturnType<typeof createStore<T>>;

const defaultSelector = <T, S = T>(state: T) => state as unknown as S;

/**
 * store의 상태를 구독하고 선택된 값을 반환하는 Hook입니다.
 *
 * @template T store 상태의 타입
 * @template S selector 결과의 타입
 * @param store createStore로 생성된 store 인스턴스
 * @param selector 상태에서 값을 선택하는 함수 (기본: 전체 상태)
 * @returns 선택된 상태 값 (shallow comparison으로 최적화됨)
 */
export const useStore = <T, S = T>(store: Store<T>, selector: (state: T) => S = defaultSelector<T, S>) => {
  const shallowSelector = useShallowSelector(selector);

  return useSyncExternalStore(
    store.subscribe, // 구독 함수
    () => shallowSelector(store.getState()), // getSnapshot 함수
  );
};
