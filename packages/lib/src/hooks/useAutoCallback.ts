import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  const ref = useRef<T>(fn);
  ref.current = fn;

  const callback = useCallback((...args: Parameters<T>): ReturnType<T> => {
    return ref.current(...args);
  }, []);

  return callback as T;
};
