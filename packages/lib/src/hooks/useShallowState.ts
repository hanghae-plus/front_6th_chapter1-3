import { useState } from "react";
import { shallowEquals } from "../equals";
import { useCallback } from "./useCallback";

export const useShallowState = <T>(initialstate: T) => {
  const [state, setState] = useState(initialstate);

  const setstateWithShallowEquals = useCallback((newstate: T) => {
    if (shallowEquals(state, newstate)) {
      return;
    }

    setState(newstate);
  }, []);

  return [state, setstateWithShallowEquals] as const;
};
