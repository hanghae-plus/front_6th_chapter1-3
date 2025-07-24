import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";
export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  const fnRef = useRef(fn);
  // 갱신필요 => stale closure
  fnRef.current = fn;
  const stableFn = useCallback((...args: Parameters<T>) => {
    return fnRef.current(...args);
    // 참조유지
  }, []);

  return stableFn as T;
};
