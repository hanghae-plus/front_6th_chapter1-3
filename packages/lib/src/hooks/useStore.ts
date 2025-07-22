import { useSyncExternalStore } from "react";
import type { createStore } from "../createStore";
import type { Selector } from "../types";
import { useShallowSelector } from "./useShallowSelector";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

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
  const prevSelectedState = useRef<S | undefined>(undefined);

  // ? 얘가 하는 일이 대체 뭐야? 왜 필요한거지? 반환값도 안 쓰면서?
  useSyncExternalStore(subscribe, getSnapshot);

  // 스토어를 구독하고 해지함수를 반환하는 함수
  function subscribe(onStoreChange: () => void): () => void {
    const unsubscribe = store.subscribe(onStoreChange);
    return () => unsubscribe(onStoreChange);
  }

  // 스토어의 상태를 가져오는 함수
  function getSnapshot() {
    const state = store.getState();
    const selected = selector(state);

    if (prevSelectedState.current === undefined || !shallowEquals(prevSelectedState.current, selected)) {
      prevSelectedState.current = selected;
    }

    return prevSelectedState.current;
  }

  const shallowSelector: Selector<T, S> = useShallowSelector(selector);

  return shallowSelector(store.getState());
};
