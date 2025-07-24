import { useSyncExternalStore } from "react";
import type { createStorage } from "../createStorage";

type Storage<T> = ReturnType<typeof createStorage<T>>;

export const useStorage = <T>(storage: Storage<T>) => {
  return useSyncExternalStore((onStoreChange) => storage.subscribe(onStoreChange), storage.get, storage.get);
};
