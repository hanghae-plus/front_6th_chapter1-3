import { useRef, useState } from "react";
import { shallowEquals } from "../equals";
import { useCallback } from "./useCallback";

export const useShallowState = <T>(initialValue: T) => {
  const [state, setState] = useState(initialValue);
  const ref = useRef(state);

  const setStateWithShallow = useCallback((newState: T) => {
    if (shallowEquals(ref.current, newState)) {
      return;
    }
    ref.current = newState;
    return setState(newState);
  }, []);

  return [state, setStateWithShallow] as const;
};
