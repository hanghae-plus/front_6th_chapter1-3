import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

export const useAutoCallback = <T extends AnyFunction>(fn: T) => {
  const callbackRef = useRef<T>(fn);
  callbackRef.current = fn;

  const memoCallback = useCallback((...args: Parameters<T>) => {
    return callbackRef.current(...args);
  }, []);

  return memoCallback;
};
