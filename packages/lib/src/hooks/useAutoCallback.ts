import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  const ref = useRef<T>(fn);
  // 리렌더링에서 함수를 다시 할당하기 위해
  ref.current = fn;

  return useCallback<T>(((...args) => ref.current(...args)) as T, []);
};
