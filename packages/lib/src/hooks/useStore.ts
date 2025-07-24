import type { createStore } from "../createStore";
import { useSyncExternalStore } from "react";
import { useShallowSelector } from "./useShallowSelector";

type Store<T> = ReturnType<typeof createStore<T>>;

const defaultSelector = <T, S = T>(state: T) => state as unknown as S;

/**
 * useStore - store 상태를 구독하고 선택적으로 데이터를 추출하는 훅입니다.
 *
 * 특징:
 * - useSyncExternalStore를 사용하여 store 상태 변경 감지
 * - selector를 통해 필요한 데이터만 선택적으로 추출
 * - shallow comparison을 통한 최적화된 리렌더링
 *
 * @param store createStore로 생성된 store 객체
 * @param selector 상태에서 필요한 값을 선택하는 함수 (기본값: 전체 상태 반환)
 * @returns 선택된 store 상태
 */

export const useStore = <T, S = T>(store: Store<T>, selector: (state: T) => S = defaultSelector<T, S>) => {
  const shallowSelector = useShallowSelector(selector);
  return useSyncExternalStore(store.subscribe, () => shallowSelector(store.getState()));
};
