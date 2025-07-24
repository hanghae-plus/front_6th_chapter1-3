import { useRef } from "react";
import { shallowEquals } from "../equals";

type Selector<T, S = T> = (state: T) => S;

export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  const stateRef = useRef<S>(null);

  return (state: T): S => {
    const newState = selector(state);

    if (stateRef.current === null || !shallowEquals(stateRef.current, newState)) {
      stateRef.current = newState;
    }

    return stateRef.current;
  };
};
