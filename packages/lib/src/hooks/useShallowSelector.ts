import { useRef } from "react";
import { shallowEquals } from "../equals";

type Selector<T, S = T> = (state: T) => S;

export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  const ref = useRef<S>(null);

  return (state: T): S => {
    const newValue = selector(state);

    if (ref === null || !shallowEquals(ref.current, newValue)) {
      ref.current = newValue;
    }

    return ref.current as S;
  };
};
