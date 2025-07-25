import { useState } from "react";
import { shallowEquals } from "../equals";
import { useCallback } from "./useCallback";

export const useShallowState = <T>(initialValue: T) => {
  const [value, setValue] = useState(initialValue);

  const setValueWithShallowEquals = useCallback((newValue: T) => {
    if (shallowEquals(value, newValue)) {
      return;
    }

    setValue(newValue);
  }, []);

  return [value, setValueWithShallowEquals] as const;
};
