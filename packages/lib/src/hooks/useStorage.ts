import { useSyncExternalStore } from "react";
import type { createStorage } from "../createStorage";

type Storage<T> = ReturnType<typeof createStorage<T>>;

/**
 * 커스텀 스토리지의 상태를 React 컴포넌트에서 구독하고 사용할 수 있게 해주는 훅
 * @param storage createStorage로 생성한 스토리지 객체
 * @returns 스토리지의 현재 값
 * @see useSyncExternalStore
 * @example
 * useSyncExternalStore는 아래 인자를 받습니다:
 *   1. subscribe: 상태 변경을 구독하는 함수
 *   2. getSnapshot: 현재 상태를 반환하는 함수 (클라이언트)
 *   3. getServerSnapshot: SSR에서 상태를 반환하는 함수 (선택)
 */

export const useStorage = <T>(storage: Storage<T>) => {
  // useSyncExternalStore를 사용해서 storage의 상태를 구독하고 가져오는 훅을 구현해보세요.

  return useSyncExternalStore(storage.subscribe, storage.get, storage.get);
};
