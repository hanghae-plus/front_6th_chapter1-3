import { useState } from "react";
import { shallowEquals } from "../equals";
import { useCallback } from "./useCallback";

// useState를 사용하여 상태를 관리하고, shallowEquals를 사용하여 상태 변경을 감지하는 훅
export const useShallowState = <T>(initialValue: T | (() => T)) => {
  const [state, setState] = useState<T>(initialValue);

  const setShallowState = useCallback((newValue: T | ((prevState: T) => T)) => {
    setState((prevState) => {
      const newState = typeof newValue === "function" ? (newValue as (prevState: T) => T)(prevState) : newValue;

      if (shallowEquals(prevState, newState)) return prevState;
      else return newState;
    });
  }, []);

  return [state, setShallowState];
};
