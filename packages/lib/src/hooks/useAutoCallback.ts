import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  const callbackRef = useRef(fn);
  callbackRef.current = fn; //함수바뀔 때마다 넣어줌

  const memoizedCallback = useCallback((props: unknown) => callbackRef.current(props), []); // ref를 참조하므로 useCallback은 재계산 일어나지 않음.
  return memoizedCallback as T;
};
