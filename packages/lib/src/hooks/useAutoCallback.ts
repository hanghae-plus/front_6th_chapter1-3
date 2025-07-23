import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  const fnRef = useRef(fn);

  fnRef.current = fn;

  const stableFn = useCallback((...args: Parameters<T>): ReturnType<T> => {
    return fnRef.current(...args);
  }, []);

  return stableFn as T;
};
