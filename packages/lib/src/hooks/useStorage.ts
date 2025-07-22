import { useSyncExternalStore } from "react";
import type { createStorage } from "../createStorage";

type Storage<T> = ReturnType<typeof createStorage<T>>;

export const useStorage = <T>(storage: Storage<T>) => {
  const subscribe = (listener: () => void) => {
    storage.subscribe(listener);
    return () => {};
  };

  const store = useSyncExternalStore(subscribe, storage.get);

  return store;
};
