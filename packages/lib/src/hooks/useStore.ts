import { useSyncExternalStore } from "react";

import type { createStore } from "../createStore";
import { useShallowSelector } from "./useShallowSelector";

type Store<T> = ReturnType<typeof createStore<T>>;

const defaultSelector = <T, S>(state: T) => state as unknown as S;

export const useStore = <T, S = T>(store: Store<T>, selector = defaultSelector<T, S>) => {
  const shallowSelector = useShallowSelector(selector);
  const getSnapshot = () => shallowSelector(store.getState());

  return useSyncExternalStore(store.subscribe, getSnapshot);
};
