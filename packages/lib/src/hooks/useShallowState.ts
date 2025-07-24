import { useCallback, useState } from "react";
import { shallowEquals } from "../equals";

export const useShallowState = <T>(initialValue: T | (() => T)) => {
  const [state, setState] = useState<T>(initialValue);

  const setShallowState = useCallback((curr: T) => {
    setState((prev) => {
      if (shallowEquals(prev, curr)) {
        return prev;
      }
      return curr;
    });
  }, []);

  return [state, setShallowState];
};
