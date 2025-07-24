import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

// useCallback과 useRef를 이용하여 useAutoCallback
export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  const stableFn = useCallback((...args: Parameters<T>) => fnRef.current(...args), []);
  return stableFn as T;
};
