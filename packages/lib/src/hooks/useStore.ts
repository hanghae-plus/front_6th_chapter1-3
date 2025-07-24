import type { createStore } from "../createStore";
import { useSyncExternalStore } from "react";
import { useShallowSelector } from "./useShallowSelector";

type Store<T> = ReturnType<typeof createStore<T>>;

const defaultSelector = <T, S = T>(state: T) => state as unknown as S;

export const useStore = <T, S = T>(store: Store<T>, selector: (state: T) => S = defaultSelector<T, S>) => {
  // useSyncExternalStore와 useShallowSelector를 사용해서 store의 상태를 구독하고 가져오는 훅을 구현해보세요.

  // 내가 짠 코드
  // 1. store의 상태 변화를 구독
  // const state = useSyncExternalStore(store.subscribe, store.getState);
  // 2. selector로 원하는 값 추출 및 shallow 비교
  // return useShallowSelector(selector)(state);

  // 알게 된 코드
  const shallowSelector = useShallowSelector(selector);
  //상태가 변하지 않았을 때는 렌더링이 되지 않기 위해 shallowSelector를 사용
  return useSyncExternalStore(store.subscribe, () => shallowSelector(store.getState()));
};
