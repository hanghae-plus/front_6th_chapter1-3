import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

type Selector<T, S = T> = (state: T) => S;

export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  const prevSelectedRef = useRef<S | null>(null);
  const prevStateRef = useRef<T | null>(null);

  return function shallowSelector(state: T): S {
    const selected = selector(state);
    if (prevSelectedRef.current === null || !shallowEquals(prevSelectedRef.current, selected)) {
      prevSelectedRef.current = selected;
      prevStateRef.current = state;
    }
    return prevSelectedRef.current as S;
  };
};
