import { useState } from "react";
import { shallowEquals } from "../equals";
import { useCallback } from "./useCallback";

export const useShallowState = <T>(initialValue: Parameters<typeof useState<T>>[0]) => {
  // export const useShallowState = <T>(initialValue: T) => {
  // useState를 사용하여 상태를 관리하고, shallowEquals를 사용하여 상태 변경을 감지하는 훅을 구현합니다.
  const [state, _setState] = useState(initialValue);

  const setStateWithShallowEquals = useCallback((value: Parameters<typeof useState<T>>[0]) => {
    if (!shallowEquals(state, value)) {
      _setState(value);
    }
  }, []);

  return [state, setStateWithShallowEquals] as const;
};
