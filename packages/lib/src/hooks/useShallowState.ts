import { useState, useRef, useCallback } from "react";
import { shallowEquals } from "../equals";

export const useShallowState = <T>(initialValue: T): [T, (value: T) => void] => {
  const [state, setState] = useState<T>(initialValue);
  const previousStateRef = useRef<T>(state);

  const setShallowState = useCallback((newValue: T) => {
    if (!shallowEquals(previousStateRef.current, newValue)) {
      previousStateRef.current = newValue;
      setState(newValue);
    }
  }, []);

  return [state, setShallowState];
};
