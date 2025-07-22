import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

/**
 * - 콜백 함수가 참조하는 값은 항상 최신 상태여야 한다.
 * - 동시에 콜백 함수 자체는 동일한 참조를 유지해야 한다 (useCallback 사용)
 *
 * => useRef로 콜백을 래핑하여 참조는 고정하고, 내부 current 값만 최신 함수로 업데이트한다.
 *
 * @param fn 콜백 함수
 * @returns 콜백 함수
 */
export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  // 1. useRef를 이용해 ref 객체의 참조(메모리 주소)는 변하지 않도록 한다.
  const fnRef = useRef<T>(fn);

  // 2. 렌더링마다 최신 함수를 current에 할당해 항상 최신 상태를 유지한다.
  fnRef.current = fn;

  // 3. 고정된 참조(stable reference)를 유지하면서, 내부에서 항상 최신 함수를 호출한다.
  const stableCallback = useCallback((...args: Parameters<T>) => fnRef.current(...args), []);

  return stableCallback as T;
};
