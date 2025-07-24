import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  // 최신 함수를 저장하는 ref
  const fnRef = useRef(fn);

  // 매 렌더링마다 최신 함수로 업데이트
  fnRef.current = fn;

  // 고정된 참조를 가진 wrapper 함수 생성 (빈 의존성 배열로 참조 고정!)
  const stableCallback = useCallback((...args: Parameters<T>) => {
    return fnRef.current(...args);
  }, []);

  return stableCallback as T;
};
