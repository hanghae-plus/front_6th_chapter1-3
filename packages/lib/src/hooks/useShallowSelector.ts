import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

type Selector<T, S = T> = (state: T) => S;

export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  const prevRef = useRef<S | undefined>(undefined);

  return (state: T): S => {
    const selected = selector(state);
    const shouldUpdate = !shallowEquals(prevRef.current, selected);

    if (shouldUpdate) {
      prevRef.current = selected;
    }
    return prevRef.current as S;
  };
};
