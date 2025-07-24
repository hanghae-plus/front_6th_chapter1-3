import type { RouterInstance } from "../Router";
import type { AnyFunction } from "../types";
import { useSyncExternalStore } from "react";
import { useShallowSelector } from "./useShallowSelector";

const defaultSelector = <T, S = T>(state: T) => state as unknown as S;

export const useRouter = <T extends RouterInstance<AnyFunction>, S>(router: T, selector = defaultSelector<T, S>) => {
  const memoizedSelector = useShallowSelector(selector);

  const getSnapshot = () => {
    return memoizedSelector(router);
  };

  const state = useSyncExternalStore(router.subscribe, getSnapshot, getSnapshot);

  return state;
};
