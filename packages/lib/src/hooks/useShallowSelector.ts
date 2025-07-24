import { useRef } from "react";
import { shallowEquals } from "../equals";

type Selector<T, S = T> = (state: T) => S;

export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  const prevStateRef = useRef<S | null>(null);

  return (state: T): S => {
    if (!prevStateRef.current) {
      prevStateRef.current = selector(state);
      return prevStateRef.current;
    }

    if (shallowEquals(prevStateRef.current, selector(state))) {
      return prevStateRef.current;
    }

    prevStateRef.current = selector(state);
    return prevStateRef.current;
  };
};
