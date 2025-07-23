import { useRef } from "react";
import { shallowEquals } from "../equals";

type Selector<T, S = T> = (state: T) => S;

export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  const prevState = useRef<S | null>(null);
  return (state: T): S => {
    const next = selector(state);
    return shallowEquals(prevState.current, next) ? (prevState.current as S) : (prevState.current = next);
  };
};
