import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  const callbackRef = useRef(fn);
  // 렌더링 되는 시점에 항상 최신화한다.
  callbackRef.current = fn;

  // useCallback을 사용하여 기존 함수의 참조를 유지하고, 받은 인자들을 업데이트 한다.
  const memoCallback = useCallback((...args: Parameters<T>) => {
    return callbackRef.current(...args);
  }, []);

  return memoCallback as T;
};
