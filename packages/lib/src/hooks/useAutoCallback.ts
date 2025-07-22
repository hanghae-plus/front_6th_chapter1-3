/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AnyFunction } from "../types";
import { useRef } from "./useRef";

export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  const fnRef = useRef<T>(fn);
  const stableFnRef = useRef<T>();

  // 1. 항상 최신 콜백 저장
  fnRef.current = fn;

  // 2. 첫 렌더링에서만 안정된 wrapper 생성
  if (!stableFnRef.current) {
    stableFnRef.current = ((...args: any[]) => {
      return fnRef.current?.(...args);
    }) as T;
  }

  // 3. 안정된 콜백 반환
  return stableFnRef.current;
};
