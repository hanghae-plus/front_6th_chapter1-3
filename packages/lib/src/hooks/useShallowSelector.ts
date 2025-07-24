import { useRef } from "react";
import { shallowEquals } from "../equals";

type Selector<T, S = T> = (state: T) => S;

export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  const prev = useRef<S>(undefined);
  return (state: T): S => {
    const next = selector(state);
    return shallowEquals(prev.current, next) ? (prev.current as S) : (prev.current = next);
  };
};
