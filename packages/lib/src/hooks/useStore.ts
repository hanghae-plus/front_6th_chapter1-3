import { useSyncExternalStore } from "react";
import type { createStore } from "../createStore";
import type { Selector } from "../types";
import { useShallowSelector } from "./useShallowSelector";

type Store<T> = ReturnType<typeof createStore<T>>;

const defaultSelector = <T, S = T>(state: T) => state as unknown as S;

/**
 * 스토어를 사용하는 훅
 *
 * @param store - 스토어 핸들러
 * @param selector - 스토어의 상태를 선택하는 함수 ex. (state) => state.count)
 * @returns 선택된 스토어의 상태
 */
export const useStore = <T, S = T>(store: Store<T>, selector: (state: T) => S = defaultSelector<T, S>) => {
  const shallowSelector: Selector<T, S> = useShallowSelector(selector);

  // ? 얘가 하는 일이 대체 뭐야? 왜 필요한거지? 반환값도 안 쓰면서?
  // -> 애초에 snapshot을 가져올 때 selector 함수를 적용한다.
  const selectedSnapshot = useSyncExternalStore(subscribe, getSelectedSnapshot);

  // 스토어를 구독하고 해지함수를 반환하는 함수
  function subscribe(onStoreChange: () => void): () => void {
    const unsubscribe = store.subscribe(onStoreChange);
    return () => unsubscribe(onStoreChange);
  }

  // 스토어의 상태를 가져오는 함수
  function getSelectedSnapshot() {
    return shallowSelector(store.getState());
  }

  return selectedSnapshot;
};
