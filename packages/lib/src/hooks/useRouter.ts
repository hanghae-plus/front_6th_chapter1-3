import { useSyncExternalStore, useCallback } from "react";
import type { RouterInstance } from "../Router";
import type { AnyFunction } from "../types";
import { useShallowSelector } from "./useShallowSelector";

const defaultSelector = <T, S = T>(state: T) => state as unknown as S;

export const useRouter = <T extends RouterInstance<AnyFunction>, S = T>(
  router: T,
  selector: (router: T) => S = defaultSelector<T, S>,
) => {
  const shallowSelector = useShallowSelector(selector);

  const getSnapshot = useCallback(() => shallowSelector(router), [router, shallowSelector]);

  // router.subscribe 는 createObserver 기반으로 만들어져 있어 unsubscribe 를 반환한다.
  return useSyncExternalStore(router.subscribe, getSnapshot);
};
