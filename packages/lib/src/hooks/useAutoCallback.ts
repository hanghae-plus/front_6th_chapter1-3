import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

export const useAutoCallback = <T extends AnyFunction>(fn: T) => {
  const fnRef = useRef(fn);

  // 매 렌더링마다 최신 함수로 업데이트
  fnRef.current = fn;

  const autoCallback = useCallback((...args: Parameters<T>) => {
    return fnRef.current(...args);
  }, []);

  return autoCallback;
};
