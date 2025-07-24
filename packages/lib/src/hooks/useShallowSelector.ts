import { useRef } from "react";
import { shallowEquals } from "../equals";

type Selector<T, S = T> = (state: T) => S;

export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  const selectedRef = useRef<S | undefined>(undefined);

  return (state: T): S => {
    const newValue = selector(state);

    if (selectedRef.current !== undefined && shallowEquals(selectedRef.current, newValue)) {
      return selectedRef.current as S;
    }

    selectedRef.current = newValue;
    return newValue;
  };
};
