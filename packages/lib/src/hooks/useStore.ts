import type { createStore } from "../createStore";
import { useSyncExternalStore } from "react";
import { useShallowSelector } from "./useShallowSelector";

type Store<T> = ReturnType<typeof createStore<T>>;

const defaultSelector = <T, S = T>(state: T) => state as unknown as S;

export const useStore = <T, S = T>(store: Store<T>, selector: (state: T) => S = defaultSelector<T, S>) => {
  // useSyncExternalStore와 useShallowSelector를 사용해서 store의 상태를 구독하고 가져오는 훅을 구현해보세요.

  // 1. useShallowSelector로 selector를 감싸기
  const shallowSelector = useShallowSelector(selector);

  // 2. useSyncExternalStore에서 사용
  // useSyncExternalStore(
  //    store.subscribe,
  //    store.getSnapshot,  함수여야 함
  //    store.getServerSnapshot? // 서버 사이드 렌더링에만 필요
  // );
  return useSyncExternalStore(
    store.subscribe, // 구독 함수
    () => shallowSelector(store.getState()), // getSnapshot 함수 / selector(최신상태)
  );
};
