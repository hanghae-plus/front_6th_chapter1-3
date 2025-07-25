import { useSyncExternalStore } from "react";
import type { createStore } from "../createStore";
import { useShallowSelector } from "./useShallowSelector";

type Store<T> = ReturnType<typeof createStore<T>>;

const defaultSelector = <T, S = T>(state: T) => state as unknown as S;

export const useStore = <T, S = T>(store: Store<T>, selector: (state: T) => S = defaultSelector<T, S>): S => {
  const shallowSelector = useShallowSelector(selector);

  // shallowSelector가 null을 반환할 수 있으므로, null일 경우 store의 현재 상태를 selector로 변환하여 반환
  return useSyncExternalStore(store.subscribe, () => {
    const selected = shallowSelector(store.getState());
    // shallowSelector가 null을 반환할 수 있으므로, fallback 처리
    if (selected === null) {
      return selector(store.getState());
    }
    return selected;
  }) as S;
};
