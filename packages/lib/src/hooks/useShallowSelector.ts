import { useRef } from "react";
import { shallowEquals } from "../equals";

type Selector<T, S = T> = (state: T) => S;

export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  const ref = useRef<S>(null);

  return (newState: T) => {
    const selectedState = selector(newState);
    if (!shallowEquals(ref.current, selectedState)) {
      ref.current = selectedState;
    }
    return ref.current as S;
  };
};
