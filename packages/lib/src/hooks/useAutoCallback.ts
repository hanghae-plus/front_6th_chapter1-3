import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  const fnRef = useRef(fn);
  fnRef.current = fn; // 매 렌더마다 최신 함수로 교체

  const stableCallback = useCallback(
    ((...args: Parameters<T>): ReturnType<T> => {
      return fnRef.current(...args);
    }) as T,
    [],
  );

  return stableCallback;
};
