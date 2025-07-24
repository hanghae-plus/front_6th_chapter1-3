import { useCallback, useState } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

export const useShallowState = <T>(initialValue: Parameters<typeof useState<T>>[0]) => {
  const [value, setValue] = useState(initialValue);
  const prevValue = useRef<T>(value as T);

  const setShallowState = useCallback((nextValue: T) => {
    if (!shallowEquals(prevValue.current, nextValue)) {
      prevValue.current = nextValue;
      setValue(nextValue);
    }
  }, []); //

  return [value, setShallowState] as const;
};
