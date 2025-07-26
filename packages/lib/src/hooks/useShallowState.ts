import { useState, type Dispatch, type SetStateAction } from "react";
import { shallowEquals } from "../equals";
import { useAutoCallback } from "./useAutoCallback";

export const useShallowState = <T>(initialValue: T): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState(initialValue);

  const setShallowValue = useAutoCallback((newValue: SetStateAction<T>) => {
    if (shallowEquals(value, newValue)) {
      return;
    }
    setValue(newValue);
  });

  return [value, setShallowValue];
};
