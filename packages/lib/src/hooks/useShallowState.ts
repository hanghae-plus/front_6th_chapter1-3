import { useState } from "react";
import { shallowEquals } from "../equals";
import { useCallback } from "./useCallback";

export function useShallowState<T>(initialValue: T | (() => T)): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState(initialValue);

  const setShallowState = useCallback((newValue: T | ((prev: T) => T)) => {
    setState((prevState) => {
      const nextState = typeof newValue === "function" ? (newValue as (prev: T) => T)(prevState) : newValue;
      // 1. 얕은 비교 값이 같다면 이전 상태 반환
      if (shallowEquals(nextState, prevState)) {
        return prevState;
      }
      // 2. 값이 다르다면 새로운 상태 반환
      return nextState;
    });
  }, []);

  return [state, setShallowState];
}
