import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

// useCallback과 useRef를 이용하여 useAutoCallback
export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  // 1. 콜백함수가 참조하는 값은 항상 렌더링 시점에 최신화 되어야 한다.
  const callbackFnRef = useRef(fn);
  callbackFnRef.current = fn;

  // 2. 대신 항상 동일한 참조를 유지해야 한다. (useCallback 활용)
  const stableFn = useCallback((...args: unknown[]) => {
    return callbackFnRef.current(...args);
  }, []);

  return stableFn as T;
};
