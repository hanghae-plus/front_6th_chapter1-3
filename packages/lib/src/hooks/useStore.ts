import type { createStore } from "../createStore";
import { useSyncExternalStore } from "react";
import { useShallowSelector } from "./useShallowSelector";

type Store<T> = ReturnType<typeof createStore<T>>;

const defaultSelector = <T, S = T>(state: T) => state as unknown as S;

export const useStore = <T, S = T>(store: Store<T>, selector: (state: T) => S = defaultSelector<T, S>) => {
  // useSyncExternalStore와 useShallowSelector를 사용해서 store의 상태를 구독하고 가져오는 훅을 구현해보세요.

  const shallowSelector = useShallowSelector(selector);

  return useSyncExternalStore(
    store.subscribe, // 상태 변경 구독
    () => shallowSelector(store.getState()), // 현재 상태에서 필요한 부분만 추출
  );
};
// return { getState, dispatch, subscribe };
