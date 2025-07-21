import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  const ref = useRef<T>(fn);

  // 이후 렌더마다 최신값으로 업데이트
  ref.current = fn;

  return useCallback(() => ref.current(), []) as T;
};
