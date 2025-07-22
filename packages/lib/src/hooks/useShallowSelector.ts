import { useRef } from "react";
import { shallowEquals } from "../equals";

type Selector<T, S = T> = (state: T) => S;

export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  const prevSelectedRef = useRef<S | null>(null);
  const prevStateRef = useRef<T | null>(null);

  return (state: T): S => {
    const selected = selector(state);

    if (prevStateRef.current === null || !shallowEquals(prevSelectedRef.current, selected)) {
      prevStateRef.current = state;
      prevSelectedRef.current = selected;
      return selected;
    }

    return prevSelectedRef.current as S;
  };
};
