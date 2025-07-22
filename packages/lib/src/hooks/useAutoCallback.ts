import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  const ref = useRef<T>(fn);

  ref.current = fn;

  const autoCallback = useCallback((...args: Parameters<T>) => ref.current!(...args), []);

  return autoCallback as T;
};
