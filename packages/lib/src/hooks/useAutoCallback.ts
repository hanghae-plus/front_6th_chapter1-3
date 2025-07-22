import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  const fnRef = useRef(fn);

  // 항상 최신 함수
  fnRef.current = fn;

  return useCallback((...args: Parameters<T>) => {
    return fnRef.current(...args);
  }, []) as T;
};
