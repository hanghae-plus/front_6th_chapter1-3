import { useCallback } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

type Selector<T, S = T> = (state: T) => S;

export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  const selectorRef = useRef(selector);
  selectorRef.current = selector;

  const prevSelectedStateRef = useRef<S>();

  return useCallback((state: T): S => {
    const newSelectedState = selectorRef.current(state);
    if (prevSelectedStateRef.current && shallowEquals(prevSelectedStateRef.current, newSelectedState)) {
      return prevSelectedStateRef.current;
    }
    return (prevSelectedStateRef.current = newSelectedState);
  }, []);
};
