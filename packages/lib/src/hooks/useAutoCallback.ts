import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  const fnRef = useRef<T>(fn);
  fnRef.current = fn;

  const memoizedCallback = useCallback((...args: Parameters<T>) => {
    return fnRef.current(...args);
  }, []);

  return memoizedCallback as T;
};
