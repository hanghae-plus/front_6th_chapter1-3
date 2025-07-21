import { useSyncExternalStore } from "react";
import type { createStorage } from "../createStorage";

type Storage<T> = ReturnType<typeof createStorage<T>>;

export const useStorage = <T>(storage: Storage<T>) => {
  // useSyncExternalStore를 사용해서 storage의 상태를 구독하고 가져오는 훅을 구현해보세요.

  // storage는 createStorage 함수가 반환하는 객체
  // get, set, reset, subscribe 리턴

  const state = useSyncExternalStore(storage.subscribe, () => storage.get());

  return state;
};
