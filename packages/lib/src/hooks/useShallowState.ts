import { useState } from "react";
import { shallowEquals } from "../equals";
import { useCallback } from "./useCallback";

export const useShallowState = <T>(initialValue: Parameters<typeof useState<T>>) => {
  // useState를 사용하여 상태를 관리하고, shallowEquals를 사용하여 상태 변경을 감지하는 훅을 구현합니다.

  const [state, setState] = useState<unknown>(initialValue);

  // setState는 언제나 같은 함수를 반환
  const updateState = useCallback((newState: T) => {
    if (shallowEquals(state, newState)) {
      return;
    }

    setState(newState);
  }, []);
  return [state, updateState];
};
