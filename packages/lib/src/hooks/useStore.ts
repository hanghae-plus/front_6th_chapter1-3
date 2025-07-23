import type { createStore } from "../createStore";
import { useSyncExternalStore } from "react";
import { useShallowSelector } from "./useShallowSelector";

type Store<T> = ReturnType<typeof createStore<T>>;

const defaultSelector = <T, S = T>(state: T) => state as unknown as S;

export const useStore = <T, S = T>(store: Store<T>, selector: (state: T) => S = defaultSelector<T, S>) => {
  // useSyncExternalStore와 useShallowSelector를 사용해서 store의 상태를 구독하고 가져오는 훅을 구현해보세요.

  // 셀렉터 함수를 최적화
  const shallowSelector = useShallowSelector(selector);

  // 최적화 된 getSnapshot 함수
  const getSnapshot = () => shallowSelector(store.getState());

  // getSnapshot에 최적화된 selector 함수를 전달하여 불필요한 리렌더링 방지
  const state = useSyncExternalStore((onStoreChange) => {
    store.subscribe(onStoreChange);
    return () => store.unsubscribe(onStoreChange);
  }, getSnapshot);

  return state;
};
