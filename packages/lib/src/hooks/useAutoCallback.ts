import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  // 초기화 역할
  const ref = useRef<T>(fn);
  // 리렌더링할 때 마다 값을 갱신
  ref.current = fn;

  // 함수 자체는 캐시로 저장
  // 값만 들어와서 ref를 실행
  const autoCallback = useCallback((...args: Parameters<T>) => {
    return ref.current(...args);
  }, []);
  return autoCallback as T;
};
