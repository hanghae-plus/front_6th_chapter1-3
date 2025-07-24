import { useSyncExternalStore } from "react";
import type { createStorage } from "../createStorage";

type Storage<T> = ReturnType<typeof createStorage<T>>;

// localStorage persist한 상태관리 라이브러리처럼, 스토리지 상태를 동기화 하기 위해 useSyncExternalStore를 사용
export const useStorage = <T>(storage: Storage<T>) => {
  return useSyncExternalStore(storage.subscribe, storage.get);
};
// 외부 상태 저장소 변화감지?
