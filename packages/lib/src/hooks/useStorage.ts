import { useSyncExternalStore } from "react";
import type { createStorage } from "../createStorage";

type Storage<T> = ReturnType<typeof createStorage<T>>;

export const useStorage = <T>(storage: Storage<T>) => {
  return useSyncExternalStore(
    (callback) => {
      storage.subscribe(callback);
      return () => storage.unsubscribe(callback);
    },
    () => storage.get(),
    () => storage.get(),
  );
};
