import { useSyncExternalStore } from "react";
import type { createStorage } from "../createStorage";

type Storage<T> = ReturnType<typeof createStorage<T>>;

/**
 * storage의 상태를 구독하고 현재 값을 반환하는 Hook입니다.
 *
 * @template T storage에 저장되는 값의 타입
 * @param storage createStorage로 생성된 storage 인스턴스
 * @returns 현재 storage 값 (T | null)
 */
export const useStorage = <T>(storage: Storage<T>) => {
  return useSyncExternalStore(
    storage.subscribe, // 구독 함수
    storage.get, // getSnapshot 함수
  );
};
