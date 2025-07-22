import { useState } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";
import { useCallback } from "./useCallback";

export const useShallowState = <T>(initialValue: Parameters<typeof useState<T>>[0]) => {
  const evaluatedInitial = typeof initialValue === "function" ? (initialValue as () => T)() : (initialValue as T);

  const [state, _setState] = useState<T>(evaluatedInitial);
  const stateRef = useRef<T>(evaluatedInitial);

  const stableSetState = useCallback((next: T) => {
    if (shallowEquals(stateRef.current, next)) return;
    stateRef.current = next;
    _setState(next);
  }, []);

  return [state, stableSetState];
};
