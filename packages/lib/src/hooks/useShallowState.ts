import { useState } from "react";
import { shallowEquals } from "../equals";
import { useCallback } from "./useCallback";

export const useShallowState = <T>(initialValue: T | (() => T)) => {
  // useState를 사용하여 상태를 관리하고, shallowEquals를 사용하여 상태 변경을 감지하는 훅을 구현합니다.
  const [state, setState] = useState<T>(initialValue);

  const setShallowState = useCallback((newValue: T) => {
    // shallowEquals를 사용하여 이전 상태와 새로운 상태를 비교합니다.
    if (!shallowEquals(state, newValue)) {
      setState(newValue);
    }
  }, []);

  return [state, setShallowState] as const;
};
