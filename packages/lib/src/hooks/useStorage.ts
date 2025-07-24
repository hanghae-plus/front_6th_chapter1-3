import { useSyncExternalStore } from "react";
import type { createStorage } from "../createStorage";

type Storage<T> = ReturnType<typeof createStorage<T>>;

/**
 * useSyncExternalStore를 사용해서 storage의 상태를 구독하고 가져오는 훅
 * @param storage 스토리지
 * @returns 스토리지의 상태
 */
export const useStorage = <T>(storage: Storage<T>) => {
  return useSyncExternalStore(storage.subscribe, storage.get, storage.get);
};
