import type { createStore } from "../createStore";
import { useSyncExternalStore } from "react";
import { useShallowSelector } from "./useShallowSelector";

type Store<T> = ReturnType<typeof createStore<T>>;

const defaultSelector = <T, S = T>(state: T) => state as unknown as S;

export const useStore = <T, S = T>(store: Store<T>, selector: (state: T) => S = defaultSelector<T, S>) => {
  const shallowSelector = useShallowSelector(selector);
  //상태가 변하지 않았을 때는 렌더링이 되지 않기 위해 shallowSelector를 사용
  return useSyncExternalStore(store.subscribe, () => shallowSelector(store.getState()));
};
