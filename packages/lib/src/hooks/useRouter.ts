import type { RouterInstance } from "../Router";
import type { AnyFunction } from "../types";
import { useSyncExternalStore } from "react";
import { useShallowSelector } from "./useShallowSelector";

const defaultSelector = <T, S = T>(state: T) => state as unknown as S;

/**
 * useSyncExternalStore를 사용해서 router의 상태를 구독하고 가져오는 훅
 * @param router 라우터
 * @param selector 선택자 함수
 * @returns 라우터의 상태
 */
export const useRouter = <T extends RouterInstance<AnyFunction>, S>(router: T, selector = defaultSelector<T, S>) => {
  const shallowSelector = useShallowSelector(selector);
  return useSyncExternalStore(
    router.subscribe,
    () => shallowSelector(router),
    () => shallowSelector(router),
  );
};
