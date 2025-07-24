import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

export function useAutoCallback<Callback extends AnyFunction>(callback: Callback) {
  const callbackRef = useRef<Callback>(callback);

  if (callbackRef.current !== callback) {
    callbackRef.current = callback;
  }

  return useCallback(
    (...args: Parameters<Callback>) => callbackRef.current(...args),
    [],
  ) as Callback;
}
