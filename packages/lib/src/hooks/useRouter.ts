import type { RouterInstance } from "../Router";
import type { AnyFunction } from "../types";
import { useSyncExternalStore } from "react";
import { useShallowSelector } from "./useShallowSelector";

const defaultSelector = <T, S = T>(state: T) => state as unknown as S;

export const useRouter = <T extends RouterInstance<AnyFunction>, S>(router: T, selector = defaultSelector<T, S>) => {
  // useSyncExternalStore를 사용하여 router의 상태를 구독하고 가져오는 훅을 구현합니다.
  const shallowSelector = useShallowSelector(selector);
  return useSyncExternalStore(router.subscribe, () => shallowSelector(router));
};
