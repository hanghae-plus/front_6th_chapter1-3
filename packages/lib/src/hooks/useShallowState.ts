import { useState } from "react";
import { shallowEquals } from "../equals";
import { useCallback } from "./useCallback.ts";

export const useShallowState = <T>(initialValue: T | (() => T)) => {
  // 임의로 타입 조정 initialValue: T | (() => T)
  const [state, setState] = useState<T>(initialValue);

  const setShallowState = useCallback((newValue: T) => {
    // shallowEquals를 통해 상태 변경을 감지
    setState((prev) => (shallowEquals(prev, newValue) ? prev : newValue));
  }, []);
  return [state, setShallowState] as const;
};
