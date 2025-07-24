import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

/**
 * useAutoCallback - 함수 참조는 고정하면서 내부에서는 최신 값에 접근하는 콜백을 생성합니다.
 *
 * 특징:
 * - 함수 참조가 항상 동일하게 유지됨 (=== 비교에서 항상 true)
 * - 함수 내부에서는 closure 문제 없이 최신 state/props에 접근
 * - dependency 배열이 필요 없음
 *
 * @param fn 래핑할 함수
 * @returns 최적화된 콜백 함수
 */

export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  // 최신 함수를 참조하는 ref
  const currentFn = useRef(fn);
  currentFn.current = fn;

  // 동일한 참조를 유지하는 래퍼 함수
  const wrapper = useCallback((...args: Parameters<T>): ReturnType<T> => {
    return currentFn.current(...args);
  }, []) as T;

  return wrapper;
};
