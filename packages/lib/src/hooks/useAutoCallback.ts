import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";
//함수 타입만 받아서 함수 그대로 반환하는 구조
export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  const ref = useRef(fn);
  ref.current = fn;
  //(...args: Parameters<T>) ...args는 fn의 매개변수 타입을 그대로 가져옴
  return useCallback((...args: Parameters<T>) => ref.current(...args), []) as T;
};
