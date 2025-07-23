/**
 * useAutoCallback 특징
 * 의존성이 변경되어도 참조가 변경되지 않으면서도 최신 값을 참조하는 안정적인 버전의 useCallback
 * 의존성을 따로 추가 하지 않아도 됨
 */
import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  const latestFnRef = useRef<T | undefined>(undefined);
  latestFnRef.current = fn;
  const staticFn = useCallback((...args: Parameters<T>): ReturnType<T> => {
    if (!latestFnRef.current) throw new Error("최신 함수는 항상 존재해야 합니다.");
    return latestFnRef.current(...args);
  }, []);
  return staticFn as T;
};
