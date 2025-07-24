import type { createStore } from "../createStore";
import { useSyncExternalStore } from "react";
import { useShallowSelector } from "./useShallowSelector";
import { useCallback } from "./index";

type Store<T> = ReturnType<typeof createStore<T>>;

const defaultSelector = <T, S = T>(state: T) => state as unknown as S;

export const useStore = <T, S = T>(store: Store<T>, selector: (state: T) => S = defaultSelector<T, S>) => {
  // useShallowSelector로 selector를 메모이제이션
  const shallowSelector = useShallowSelector(selector);

  // getSnapshot 함수를 useCallback으로 메모이제이션
  const getSnapshot = useCallback(() => {
    return shallowSelector(store.getState());
  }, [shallowSelector, store]);

  // useSyncExternalStore를 사용해서 store의 상태를 구독하고 가져오기
  return useSyncExternalStore(
    store.subscribe, // subscribe 함수
    getSnapshot, // getSnapshot 함수
  );
};
