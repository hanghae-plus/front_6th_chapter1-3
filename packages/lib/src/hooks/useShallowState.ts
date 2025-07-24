import { useState, useCallback } from "react";
import { shallowEquals } from "../equals";

export const useShallowState = <T>(initialValue: T): [T, (newValue: T) => void] => {
  const [state, setState] = useState(initialValue);

  const updateState = useCallback((newValue: T) => {
    setState((prevState) => {
      if (shallowEquals(prevState, newValue)) {
        return prevState;
      }
      return newValue;
    });
  }, []);

  return [state, updateState];
};
