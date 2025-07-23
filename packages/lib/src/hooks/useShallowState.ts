import { useState } from "react";
import { shallowEquals } from "../equals";
import { useCallback } from "./useCallback";

export const useShallowState = <T>(initialValue: T) => {
  const [state, setState] = useState(initialValue);

  const setShallowState = useCallback((newValue: T) => {
    setState((prev) => (shallowEquals(prev, newValue) ? prev : newValue));
  }, []);

  return [state, setShallowState];
};
