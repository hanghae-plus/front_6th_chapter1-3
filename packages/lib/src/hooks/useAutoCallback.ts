import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  const prevFn = useRef<T | null>(null);

  prevFn.current = fn;

  return useCallback((...args: Parameters<T>) => prevFn.current?.(...args), []) as T;
};
