/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import { shallowEquals } from "../equals";
import { isFunction } from "../equals/utils";

export const useShallowState = <T>(initialValue: T | (() => T)) => {
  const [state, setState] = useState<T>(initialValue);

  const setShallowState = useCallback((value: T | ((prev: T) => T)) => {
    const nextValue = isFunction(value) ? value(state) : value;
    if (shallowEquals(state, nextValue)) {
      return;
    }

    setState(nextValue);
  }, []);

  return [state, setShallowState] as const;
};
