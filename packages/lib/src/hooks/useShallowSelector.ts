import { useRef } from "react";
import { shallowEquals } from "../equals";

type Selector<T, S = T> = (state: T) => S;

export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  const prevResultRef = useRef<S | null>(null);

  return (state: T): S => {
    const result = selector(state);

    if (prevResultRef.current && shallowEquals(prevResultRef.current, result)) {
      return prevResultRef.current;
    }

    prevResultRef.current = result;

    return result;
  };
};
