import { useRef } from "react";
import { shallowEquals } from "../equals";

type Selector<T, S = T> = (state: T) => S;

export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  const prevResultRef = useRef<S | null>(null);

  return (state: T): S => {
    const currentResult = selector(state);
    if (shallowEquals(prevResultRef.current, currentResult)) {
      return prevResultRef.current!;
    }

    prevResultRef.current = currentResult;
    return currentResult;
  };
};
