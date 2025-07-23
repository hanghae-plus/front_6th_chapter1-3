import { useSyncExternalStore } from "react";
import type { createStorage } from "../createStorage";

type Storage<T> = ReturnType<typeof createStorage<T>>;

/**
 * 저장소를 사용하는 훅
 *
 * @param storage - 저장소 핸들러
 * @returns 저장소의 상태
 */
export const useStorage = <T>(storage: Storage<T>) => {
  /**
   * useSyncExternalStore<T | null>
   * (subscribe: (onStoreChange: () => void) => () => void,
   * getSnapshot: () => T | null,
   * getServerSnapshot?: (() => T | null) | undefined): T | null
   */
  const snapshot = useSyncExternalStore(subscribe, getSnapshot);

  function subscribe(onStoreChange: () => void): () => void {
    const unsubscribe = storage.subscribe(onStoreChange);

    return () => unsubscribe(onStoreChange);
  }

  function getSnapshot(): T | null {
    return storage.get();
  }

  return snapshot;
};
