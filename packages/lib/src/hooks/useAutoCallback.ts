import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  // useCallBack과 useRef를 이용하여 useAutoCallBack 구현
  const prevRef = useRef(fn);
  prevRef.current = fn;

  const autoCallBack = useCallback((...args: Parameters<T>): ReturnType<T> => {
    return prevRef.current(...args);
  }, []);

  return autoCallBack as T;
};
