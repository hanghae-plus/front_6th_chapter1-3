import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  const ref = useRef(fn);

  // 매 렌더마다 최신 함수로 갱신
  ref.current = fn;

  // 참조는 고정되지만, 내부 로직은 항상 최신
  const stableCallback = useCallback(
    ((...args: unknown[]) => {
      return ref.current(...args);
    }) as T,
    [],
  );

  return stableCallback;
};
