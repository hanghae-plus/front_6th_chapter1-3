import type { RouterInstance } from "../Router";
import type { AnyFunction } from "../types";
import { useSyncExternalStore } from "react";
import { useShallowSelector } from "./useShallowSelector";

const defaultSelector = <T, S = T>(state: T) => state as unknown as S;

export const useRouter = <T extends RouterInstance<AnyFunction>, S>(router: T, selector = defaultSelector<T, S>) => {
  // useSyncExternalStore를 사용하여 router의 상태를 구독하고 가져오는 훅을 구현합니다.

  // 셀렉터 함수를 최적화
  const shallowSelector = useShallowSelector(selector);

  // 최적화 된 getSnapshot 함수
  const getSnapshot = () => shallowSelector(router);

  // getSnapshot에 최적화된 selector 함수를 전달하여 불필요한 리렌더링 방지
  const state = useSyncExternalStore((onStoreChange) => {
    router.subscribe(onStoreChange);
    return () => router.unsubscribe(onStoreChange);
  }, getSnapshot);

  return state;
};
