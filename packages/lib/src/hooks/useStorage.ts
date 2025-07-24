import { useSyncExternalStore } from "react";
import type { createStorage } from "../createStorage";
import { useCallback } from "./useCallback";

type Storage<T> = ReturnType<typeof createStorage<T>>;

export const useStorage = <T>(storage: Storage<T>) => {
  const { subscribe, get: getSnapshot } = storage;
  const getServerSnapshot = useCallback(() => getSnapshot(), [getSnapshot]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
