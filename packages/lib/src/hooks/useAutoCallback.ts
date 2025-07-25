import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  const fnRef = useRef<T>(fn);

  // 렌더링 시점에 매번 업데이트
  fnRef.current = fn;

  const memoizedCallback = useCallback((...args: Parameters<T>) => fnRef.current(...args), []);

  // 항상 같은 참조를 반환하되, 내부에서 최신 fn을 호출
  return memoizedCallback as T;
};
