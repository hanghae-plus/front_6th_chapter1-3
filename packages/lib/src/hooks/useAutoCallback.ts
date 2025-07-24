import { useRef } from "./useRef";
import type { AnyFunction } from "../types";

export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  const memoizedFn = useRef<T>();

  if (!memoizedFn.current) {
    memoizedFn.current = ((...args: Parameters<T>): ReturnType<T> => fnRef.current(...args)) as T;
  }

  return memoizedFn.current as T;
};
