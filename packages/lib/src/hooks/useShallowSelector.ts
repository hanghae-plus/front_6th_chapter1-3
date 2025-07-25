import { useRef } from "react";
import { shallowEquals } from "../equals";

type Selector<T, S = T> = (state: T) => S;

export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  const prevRef = useRef<S | undefined>(undefined);

  return (state: T): S => {
    const next = selector(state);

    if (!prevRef.current || !shallowEquals(prevRef.current, next)) {
      prevRef.current = next;
      return next;
    }

    return prevRef.current as S;
  };
};
