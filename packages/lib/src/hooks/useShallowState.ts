import { useState } from "react";
import { shallowEquals } from "../equals";
import { useCallback } from "./useCallback";

export const useShallowState = <T>(initialValue: T) => {
  // useState를 사용하여 상태를 관리하고, shallowEquals를 사용하여 상태 변경을 감지하는 훅을 구현합니다.

  const [state, setState] = useState<T>(initialValue);

  const setShallowState = useCallback((newValue: T) => {
    if (!shallowEquals(state, newValue)) {
      setState(newValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [state, setShallowState] as const;
};
