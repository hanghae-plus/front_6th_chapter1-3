import { useRef } from "react";
import { shallowEquals } from "../equals";

export function useShallowSelector<T, S>(selector: (state: T) => S): (state: T) => S {
  const prevResultRef = useRef<S | undefined>(undefined);

  const shallowSelector = (state: T): S => {
    const result = selector(state);
    if (!shallowEquals(prevResultRef.current, result)) prevResultRef.current = result;
    return prevResultRef.current as S;
  };

  return shallowSelector;
}
