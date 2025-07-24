import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

// 참조가 변경되지 않으면 항상 새로운 값을 참조
export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  const ref = useRef(fn);

  const callback = useCallback((...args: Parameters<T>) => {
    return ref.current(...args);
  }, []);

  ref.current = fn;
  return callback as T;
};
