import type { createStore } from "../createStore";
import { useSyncExternalStore } from "react";
import { useShallowSelector } from "./useShallowSelector";

type Store<T> = ReturnType<typeof createStore<T>>;

const defaultSelector = <T, S = T>(state: T) => state as unknown as S;

/**
 * useSyncExternalStore와 useShallowSelector를 사용해서 store의 상태를 구독하고 가져오는 훅
 * @param store 스토어
 * @param selector 선택자 함수
 * @returns 스토어의 상태
 */
export const useStore = <T, S = T>(store: Store<T>, selector: (state: T) => S = defaultSelector<T, S>) => {
  const shallowSelector = useShallowSelector(selector);

  return useSyncExternalStore(
    store.subscribe,
    () => shallowSelector(store.getState()),
    () => shallowSelector(store.getState()),
  );
};
