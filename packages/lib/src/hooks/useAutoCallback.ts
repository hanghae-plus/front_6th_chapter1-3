import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

/**
 * 함수 참조가 변경되지 않으면서 항상 새로운 값을 참조하는 훅
 * 항상 같은 참조(=같은 함수) 를 유지하면서
 * 내부에서 최신 상태를 사용할 수 있어야 한다.
 */
export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  // 함수 참조를 유지하기 위해 useRef 사용
  const ref = useRef<T>(fn);
  // 함수 참조 업데이트
  ref.current = fn;

  // 함수 참조가 변경되지 않으면서 항상 새로운 값을 참조하는 훅
  const callback = useCallback((...args: Parameters<T>) => {
    return ref.current(...args);
  }, []);

  return callback as T;
};
