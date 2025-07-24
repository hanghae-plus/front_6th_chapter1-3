import type { RouterInstance } from "../Router";
import type { AnyFunction } from "../types";
import { useSyncExternalStore } from "react";
import { useShallowSelector } from "./useShallowSelector";

const defaultSelector = <T, S = T>(state: T) => state as unknown as S;

// 인터페이스
// useRouter(router, ({ target }) => target);

export const useRouter = <T extends RouterInstance<AnyFunction>, S>(router: T, selector = defaultSelector<T, S>) => {
  const { subscribe } = router;

  const shallowSelector = useShallowSelector(selector);

  const getSnapshot = () => {
    return shallowSelector(router);
  };

  return useSyncExternalStore(subscribe, getSnapshot);
};
