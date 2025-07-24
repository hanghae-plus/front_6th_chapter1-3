import { useState } from "react";
import { shallowEquals } from "../equals";
import { useCallback } from "./useCallback.ts";

export const useShallowState = <T>(initialValue: T | (() => T)) => {
  const [state, setState] = useState(initialValue);
  const setValueShallow = useCallback((newValue: T) => {
    setState((prevValue) => {
      return shallowEquals(prevValue, newValue) ? prevValue : newValue;
    });
  }, []);

  return [state, setValueShallow] as const;
};
