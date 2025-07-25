import { useState, useCallback } from "react";
import { shallowEquals } from "../equals";
//얕은 비교를 통해 상태를 관리
export const useShallowState = <T>(initialValue: T) => {
  const [first, setFirst] = useState<T>(initialValue);
  const customSetState = useCallback((next: T) => {
    setFirst((prev) => {
      if (!shallowEquals(prev, next)) {
        return next;
      }
      return prev;
    });
  }, []);
  return [first, customSetState] as const;
};
