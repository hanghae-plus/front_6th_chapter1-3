import { useSyncExternalStore, useCallback } from "react";
import type { createStorage } from "../createStorage";
import { useShallowSelector } from "./useShallowSelector";

type Storage<T> = ReturnType<typeof createStorage<T>>;

export const useStorage = <T>(storage: Storage<T>) => {
  // storage.get() 의 반환값 자체를 shallow 비교하여 동일 참조 유지
  const shallowSelector = useShallowSelector((state: T | null) => state);

  const getSnapshot = useCallback(() => shallowSelector(storage.get()), [storage, shallowSelector]);

  return useSyncExternalStore(storage.subscribe, getSnapshot);
};
