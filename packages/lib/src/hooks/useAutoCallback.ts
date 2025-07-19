import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  const ref = useRef(fn);

  ref.current = fn;

  const newFn = useCallback((...args: Parameters<T>) => ref.current(...args), []);

  return newFn as T;
};
