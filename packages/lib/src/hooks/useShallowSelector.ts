import { useRef } from "react";
import { shallowEquals } from "../equals";

type Selector<T, S = T> = (state: T) => S;

export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  const prevSelectedRef = useRef<S>(null);
  const hasInitialized = useRef(false);

  return (state: T): S => {
    const selected = selector(state);

    if (!hasInitialized.current || !shallowEquals(prevSelectedRef.current, selected)) {
      hasInitialized.current = true;
      prevSelectedRef.current = selected;
    }

    return prevSelectedRef.current as S;
  };
};
