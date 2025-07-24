import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  // 함수의 최신 버전을 ref에 저장
  const fnRef = useRef<T>(fn);

  // 매 렌더링마다 최신 함수로 업데이트
  fnRef.current = fn;

  // useCallback을 사용하여 안정적인 참조 유지
  return useCallback((...args: Parameters<T>) => {
    return fnRef.current(...args);
  }, []) as T;
};
