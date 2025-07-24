import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  const ref = useRef(fn);
  // 초기값으로 fn 설정해줬는데 왜 또 아래에서 fn을 할당하지
  ref.current = fn;
  return useCallback((...args) => {
    return ref.current(...args);
  }, []);
};
