import { useRef } from "react";
import { shallowEquals } from "../equals";

type Selector<T, S = T> = (state: T) => S;

export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  const prevStateRef = useRef<S | null>(null);

  return (state: T): S => {
    const selectedState = selector(state);

    if (prevStateRef.current === null || !shallowEquals(prevStateRef.current, selectedState)) {
      prevStateRef.current = selectedState;
    }
    return prevStateRef.current;
  };
};
