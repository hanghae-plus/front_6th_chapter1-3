import { useState } from "react";
import { shallowEquals } from "../equals";
import { useCallback } from "./useCallback";

export function useShallowState<T>(initialValue: T): [T, (newValue: T) => void] {
  const [state, setState] = useState(initialValue);

  // setState가 shallow 비교 후 동일하면 무시
  const setShallowState = useCallback((newValue: T) => {
    setState((prev) => {
      if (shallowEquals(prev, newValue)) {
        return prev; // 이전 값 유지 (리렌더 X)
      }
      return newValue; // 상태 업데이트
    });
  }, []);

  return [state, setShallowState];
}
