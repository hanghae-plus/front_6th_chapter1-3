import { useState } from "react";
import type { SetStateAction, Dispatch } from "react";
import { useCallback } from "./useCallback";
import { shallowEquals } from "../equals";

export const useShallowState = <T>(initialValue: T | (() => T)): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState(initialValue);

  const customSetValue = useCallback((newValue: SetStateAction<T>) => {
    setValue((prevValue: T) => {
      // setState(prev => prev + 1) 형태의 업데이트 함수를 사용할 수 있도록 함
      newValue = typeof newValue === "function" ? (newValue as (prevState: T) => T)(prevValue) : newValue;

      if (!shallowEquals(prevValue, newValue)) {
        return newValue;
      }

      return prevValue;
    });
  }, []);

  return [value, customSetValue];
};
