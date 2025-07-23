import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  const ref = useRef(fn);
  ref.current = fn;

  return useCallback((...args: Parameters<T>) => ref.current(...args), []) as T;
};
