import { useState } from "react";
import { shallowEquals } from "../equals";
import { useCallback } from "./useCallback";

export const useShallowState = <T>(initialValue: T | (() => T)) => {
  const [state, setState] = useState<T>(initialValue);

  const setShallowState = useCallback((next: T) => {
    setState((prev) => {
      if (shallowEquals(prev, next)) {
        return prev;
      }

      return next;
    });
  }, []);

  return [state, setShallowState] as const;
};
