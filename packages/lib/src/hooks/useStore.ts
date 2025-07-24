import { useSyncExternalStore, useCallback } from "react";
import type { createStore } from "../createStore";
import { useShallowSelector } from "./useShallowSelector";

type Store<T> = ReturnType<typeof createStore<T>>;

const defaultSelector = <T, S = T>(state: T) => state as unknown as S;

export const useStore = <T, S = T>(store: Store<T>, selector: (state: T) => S = defaultSelector<T, S>) => {
  // shallowSelector 는 selector 결과를 캐싱해준다.
  const shallowSelector = useShallowSelector(selector);

  const getSnapshot = useCallback(() => shallowSelector(store.getState()), [store, shallowSelector]);

  return useSyncExternalStore(store.subscribe, getSnapshot);
};
