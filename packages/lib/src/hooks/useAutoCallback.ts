import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

/**
 * 콜백 함수가 참조하는 값들을 항상 최신 상태로 유지하면서도
 * 동일한 함수 참조를 보장하는 훅
 *
 * @template T 콜백 함수의 타입
 * @param fn 래핑할 콜백 함수
 * @returns 항상 동일한 참조를 가지지만 최신 값을 참조하는 콜백 함수
 */
export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  const fnRef = useRef(fn);

  fnRef.current = fn;

  const stableCallback = useCallback((...args: Parameters<T>) => {
    return fnRef.current(...args);
  }, []) as T;

  return stableCallback;
};
