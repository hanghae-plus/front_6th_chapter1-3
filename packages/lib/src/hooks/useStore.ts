import { useSyncExternalStore } from "react";
import type { createStore } from "../createStore";
import { useShallowSelector } from "./useShallowSelector";

type Store<T> = ReturnType<typeof createStore<T>>;

const defaultSelector = <T, S = T>(state: T) => state as unknown as S;

export const useStore = <T, S = T>(store: Store<T>, selector: (state: T) => S = defaultSelector<T, S>) => {
  const shallowSelector = useShallowSelector(selector);
  //  selector 함수 자체가 아닌 state반환
  return useSyncExternalStore(store.subscribe, () => shallowSelector(store.getState()));
};
