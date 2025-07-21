import { useState, type Dispatch, type SetStateAction } from "react";

import { shallowEquals } from "../equals";
import { useCallback } from "./useCallback";

export const useShallowState = <T>(initialValue: T): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(initialValue);

  const setShallow = useCallback((newValue: SetStateAction<T>) => {
    setValue((prev) => {
      const nextValue = typeof newValue === "function" ? (newValue as (prevValue: T) => T)(prev) : newValue;
      return shallowEquals(prev, nextValue) ? prev : nextValue;
    });
  }, []);

  return [value, setShallow];
};
