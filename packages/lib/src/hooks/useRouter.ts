import type { RouterInstance } from "../Router";
import type { AnyFunction } from "../types";
import { useSyncExternalStore } from "react";
import { useShallowSelector } from "./useShallowSelector";

const defaultSelector = <T, S = T>(state: T) => state as unknown as S;

/**
 * 라우터 인스턴스를 사용하는 훅
 *
 * @param router - 라우터 인스턴스
 * @param selector - 라우터 인스턴스의 상태를 선택하는 함수 ex. (state) => state.count)
 * @returns 선택된 라우터 인스턴스의 상태
 */
export const useRouter = <T extends RouterInstance<AnyFunction>, S>(router: T, selector = defaultSelector<T, S>) => {
  const shallowSelector = useShallowSelector(selector);

  const selectedSnapshot = useSyncExternalStore(subscribe, getSelectedSnapshot);

  function subscribe(onStoreChange: () => void): () => void {
    const unsubscribe = router.subscribe(onStoreChange);
    return () => unsubscribe(onStoreChange);
  }

  function getSelectedSnapshot() {
    return shallowSelector(router);
  }

  return selectedSnapshot;
};
