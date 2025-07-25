import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

/**
 * 콜백 함수를 메모이제이션하는 훅
 * @param fn 메모이제이션할 콜백 함수
 * @returns 메모이제이션된 콜백 함수
 */
export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  // 1. 콜백함수가 참조하는 값은 항상 렌더링 시점에 최신화 되어야한다. ← 이 부분을 어떻게 해결할 수 있을지 고민해보세요!
  const fnRef = useRef(fn);
  fnRef.current = fn;

  // 2. 대신 항상 동일한 참조를 유지해야 한다 (useCallback 활용)
  return useCallback((...args: unknown[]) => {
    return fnRef.current(...args);
  }, []) as T;
};
