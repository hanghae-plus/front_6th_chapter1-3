import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  const fnRef = useRef<T>(fn);
  fnRef.current = fn;

  const result = useCallback((...args: Parameters<T>) => {
    return fnRef.current(...args);
  }, []);

  return result as T;
};
