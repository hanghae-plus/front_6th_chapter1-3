import type { createStore } from "../createStore";
import { useSyncExternalStore } from "react";
import { useShallowSelector } from "./useShallowSelector";

type Store<T> = ReturnType<typeof createStore<T>>;

const defaultSelector = <T, S = T>(state: T) => state as unknown as S;

export const useStore = <T, S = T>(store: Store<T>, selector: (state: T) => S = defaultSelector<T, S>) => {
  // useSyncExternalStore와 useShallowSelector를 사용해서 store의 상태를 구독하고 가져오는 훅을 구현해보세요.
  const memoizedSelector = useShallowSelector(selector);
  const subscribe = (callback: () => void) => {
    return store.subscribe(callback);
  };
  const getSnapShot = () => {
    // "결과값이 이전과 같다면, 새로운 객체를 만들지 말고 이전에 만들었던 객체를 그대로 반환"
    return memoizedSelector(store.getState());
  };
  return useSyncExternalStore(subscribe, getSnapShot);
};
