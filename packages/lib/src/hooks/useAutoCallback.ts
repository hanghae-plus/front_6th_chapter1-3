import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

/**
 * 항상 최신 클로저를 참조하면서도 안정된 함수 참조를 제공하는 훅입니다.
 *
 * @param fn - 메모이제이션할 함수
 * @returns 항상 동일한 참조를 가지지만 최신 클로저를 사용하는 함수
 */
export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  // 최신 함수를 저장할 ref
  const fnRef = useRef(fn);

  // 매 렌더링마다 최신 함수로 업데이트
  fnRef.current = fn;

  // 항상 동일한 참조를 가진 wrapper 함수 반환
  return useCallback((...args: Parameters<T>) => {
    // 호출 시점에 최신 함수 실행
    return fnRef.current(...args);
  }, []) as T;
};
