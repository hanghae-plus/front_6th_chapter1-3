import { useRef } from "react";
import { shallowEquals } from "../equals";

type Selector<T, S = T> = (state: T) => S;

/**
 * useSyncExternalStoreWithSelector를 사용해서 사용하지 않았으나 구현은 추가해놓음
 */
export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  const previousStateRef = useRef<S | undefined>(undefined);

  return (state: T): S => {
    const prevValue = previousStateRef.current;
    const newValue = selector(state);

    if (prevValue === undefined || !shallowEquals(prevValue, newValue)) {
      previousStateRef.current = newValue;
      return newValue;
    }

    return prevValue;
  };
};
