import { useRef, useCallback } from "react";
import type { AnyFunction } from "../types";

export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  // 최신 함수를 ref 에 저장한다.
  const fnRef = useRef<T>(fn);
  fnRef.current = fn;

  // 빈 deps 로 보장된 고정 참조의 콜백을 만든다.

  const stableCallback = useCallback(
    ((...args: unknown[]) => {
      // 타입 단언으로 안전하게 반환값 유지

      return fnRef.current(...(args as Parameters<T>));
    }) as T,
    [],
  );

  return stableCallback;
};
