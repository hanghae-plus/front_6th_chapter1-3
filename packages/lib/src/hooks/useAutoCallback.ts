import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

// useCallback과 useRef를 이용하여 useAutoCallback
export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  const fnRef = useRef<T>(fn);
  fnRef.current = fn;

  // 의존성 배열이 빈배열이어서 항상 동일한 참조 유지
  const callback = useCallback((...args: Parameters<T>): ReturnType<T> => {
    return fnRef.current(...args); // 함수를 실행하면 됨
  }, []);

  return callback as T;
};
