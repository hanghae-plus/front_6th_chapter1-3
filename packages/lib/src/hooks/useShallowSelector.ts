import { useRef } from "react";
import { shallowEquals } from "../equals";

type Selector<T, S = T> = (state: T) => S;

export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  const ref = useRef<S | null>(null);

  return (state: T): S => {
    const result = selector(state);

    if (ref.current && shallowEquals(ref.current, result)) {
      return ref.current;
    }

    ref.current = result;
    return result;
  };
};
