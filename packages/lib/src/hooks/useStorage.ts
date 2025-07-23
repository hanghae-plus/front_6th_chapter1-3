import { useSyncExternalStore } from "react";
import type { createStorage } from "../createStorage";

type Storage<T> = ReturnType<typeof createStorage<T>>;

export const useStorage = <T>(storage: Storage<T>) => {
  // useSyncExternalStore를 사용해서 storage의 상태를 구독하고 가져오는 훅을 구현해보세요.
  const subscribe = (callback: () => void) => {
    return storage.subscribe(callback);
  };

  const getSnapShot = () => {
    return storage.get();
  };

  const value = useSyncExternalStore(subscribe, getSnapShot, null);

  return value;
};
