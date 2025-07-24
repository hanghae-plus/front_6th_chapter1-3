import { useSyncExternalStore } from "react";
import type { createStorage } from "../createStorage";

type Storage<T> = ReturnType<typeof createStorage<T>>;

/**
 * useStorage - storage 상태를 구독하고 가져오는 훅입니다.
 *
 * 특징:
 * - useSyncExternalStore를 사용하여 external storage 상태 구독
 * - storage 값이 변경될 때마다 자동으로 컴포넌트 리렌더링
 * - createStorage로 생성된 storage 객체와 함께 사용
 *
 * @param storage createStorage로 생성된 storage 객체
 * @returns 현재 storage 값
 */

export const useStorage = <T>(storage: Storage<T>) => {
  const state = useSyncExternalStore(storage.subscribe, () => storage.get());
  return state;
};
