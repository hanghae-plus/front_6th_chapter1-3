import { useState } from "react";
import { shallowEquals } from "../equals";
import { useCallback } from "./useCallback";

export const useShallowState = <T>(initialValue: T | (() => T)) => {
  const [state, setSTate] = useState(() => initialValue);

  const compareState = useCallback((newState: T | (() => T)) => {
    setSTate((prevState) => {
      if (!shallowEquals(prevState, newState)) {
        return newState;
      }
      return prevState;
    });
  }, []);

  return [state, compareState];
};
