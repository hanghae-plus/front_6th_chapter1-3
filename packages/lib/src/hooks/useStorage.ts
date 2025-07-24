import { useSyncExternalStore } from "react";
import type { createStorage } from "../createStorage";

type Storage<T> = ReturnType<typeof createStorage<T>>;

export const useStorage = <T>(storage: Storage<T>) => {
  const storageStore = useSyncExternalStore(storage.subscribe, storage.get);

  return storageStore;
};
