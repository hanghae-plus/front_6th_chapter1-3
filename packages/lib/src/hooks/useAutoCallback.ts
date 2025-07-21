import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

// useCallback과 useRef를 이용하여 useAutoCallback
export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  // - 콜백함수가 참조하는 값은 항상 렌더링 시점에 최신화
  // - 항상 동일한 참조를 유지
  const fnRef = useRef(fn);

  fnRef.current = fn;

  const memoizedCallback = useCallback((...args: Parameters<T>): T => {
    return fnRef.current(...args) as T;
  }, []);

  return memoizedCallback as T;
};
