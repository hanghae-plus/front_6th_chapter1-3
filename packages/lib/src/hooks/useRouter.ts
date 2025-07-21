import type { RouterInstance } from "../Router";
import type { AnyFunction } from "../types";
import { useSyncExternalStore } from "react";
import { useShallowSelector } from "./useShallowSelector";

const defaultSelector = <T, S = T>(state: T) => state as unknown as S;

export const useRouter = <T extends RouterInstance<AnyFunction>, S>(router: T, selector = defaultSelector<T, S>) => {
  // useSyncExternalStore를 사용하여 router의 상태를 구독하고 가져오는 훅을 구현합니다.
  const shallowSelector = useShallowSelector(selector);
  // useSyncExternalStore 두 번째 인자(현재상태)는 "전체 상태"를 반환해야 함
  const state = useSyncExternalStore(router.subscribe, () => shallowSelector(router));
  return state;
};
