import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  // 함수 자체를 값으로 관리
  const ref = useRef<T>(fn);

  // 함수가 바뀌었으면 최신화
  if (ref.current !== fn) {
    ref.current = fn;
  }

  // 항상 동일한 참조를 반환하면서 내부 로직만 최신화된 ref를 호출
  const stableCallback = useCallback((...args: Parameters<T>): ReturnType<T> => {
    return ref.current(...args);
  }, []);

  return stableCallback as T;
};
