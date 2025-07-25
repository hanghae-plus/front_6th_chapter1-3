import { useSyncExternalStore } from "react";
import type { createStorage } from "../createStorage";

type Storage<T> = ReturnType<typeof createStorage<T>>;

export const useStorage = <T>(storage: Storage<T>) => {
  // useSyncExternalStore를 사용해서 storage의 상태를 구독하고 가져오는 훅을 구현해보세요.
  return useSyncExternalStore(
    storage.subscribe, // 상태가 바뀌면 리렌더링할 수 있도록
    storage.get, // 현재 스냅샷을 가져옴
  );
};
