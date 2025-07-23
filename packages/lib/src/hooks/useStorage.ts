import { useSyncExternalStore } from "react";
import type { createStorage } from "../createStorage";

type Storage<T> = ReturnType<typeof createStorage<T>>;

/**
 * 외부 storage의 상태를 구독하고 현재 값을 반환하는 커스텀 훅입니다.
 *
 * - useSyncExternalStore를 사용하여 storage의 변경 사항을 구독합니다.
 * - storage 객체의 get()을 통해 현재 값을 가져옵니다.
 * - 여러 컴포넌트가 동일 storage를 구독할 경우, 값이 변경되면 모두 동기화되어 리렌더링됩니다.
 *
 * @template T storage에 저장되는 값의 타입
 *
 * @param storage 상태를 보관하는 외부 storage 객체 (createStorage로 생성)
 * @returns storage에 저장된 현재 값 (초기값이 없으면 null)
 */
export const useStorage = <T>(storage: Storage<T>) => {
  const slice = useSyncExternalStore(storage.subscribe, storage.get, storage.get);

  return slice;
};
