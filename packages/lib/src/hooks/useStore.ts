import type { createStore } from "../createStore";
import { useSyncExternalStore } from "react";
import { useShallowSelector } from "./useShallowSelector";

type Store<T> = ReturnType<typeof createStore<T>>;

const defaultSelector = <T, S = T>(state: T) => state as unknown as S;

export const useStore = <T, S = T>(store: Store<T>, selector: (state: T) => S = defaultSelector<T, S>) => {
  const memoizedSelector = useShallowSelector(selector);

  const getSnapshot = () => {
    return memoizedSelector(store.getState());
  };

  const state = useSyncExternalStore(store.subscribe, getSnapshot, getSnapshot);

  return state;
};
