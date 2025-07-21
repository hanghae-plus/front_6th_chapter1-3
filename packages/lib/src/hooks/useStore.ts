import type { createStore } from "../createStore";
import { useSyncExternalStore } from "react";
import { useShallowSelector } from "./useShallowSelector";

type Store<T> = ReturnType<typeof createStore<T>>;

const defaultSelector = <T, S = T>(state: T) => state as unknown as S;

/**
 * 외부 store의 상태를 구독하고 선택된 상태(slice)를 반환하는 커스텀 훅입니다.
 *
 * - useSyncExternalStore를 사용하여 store 변경 사항을 구독합니다.
 * - 선택자(selector)를 통해 필요한 부분만 선택하고, useShallowSelector로 얕은 비교를 통해 불필요한 리렌더링을 방지합니다.
 *
 * @template T 전체 store 상태의 타입
 * @template S 선택된 상태(slice)의 타입 (기본값은 전체 상태 T)
 *
 * @param store 상태를 보관하는 외부 store 객체
 * @param selector 상태 중 필요한 부분을 선택하는 함수 (기본값은 전체 상태 반환)
 * @returns 선택된 상태(slice)
 */
export const useStore = <T, S = T>(store: Store<T>, selector: (state: T) => S = defaultSelector<T, S>) => {
  const shallowSelector = useShallowSelector(selector);

  const slice = useSyncExternalStore(
    store.subscribe, // store의 상태 변경을 구독
    () => shallowSelector(store.getState()), // 현재 상태를 얕은 비교를 통해 선택
    () => selector(store.getState()), // 서버 사이드 렌더링 시 초기 상태를 선택
  );

  return slice;
};
