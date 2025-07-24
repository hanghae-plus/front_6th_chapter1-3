import { useState } from "react";
import { shallowEquals } from "../equals";
import { useCallback } from "react";

export const useShallowState = <T>(initialValue: T | (() => T)) => {
  // useState를 사용하여 상태를 관리하고, shallowEquals를 사용하여 상태 변경을 감지하는 훅을 구현합니다.
  const [state, setState] = useState<T>(initialValue);

  const setShallowState = useCallback((value: T) => {
    setState((prevState: T) => {
      // prevState는 항상 최신 상태값을 참조합니다
      return shallowEquals(prevState, value) ? prevState : value;
    });
  }, []);

  return [state, setShallowState] as const;
};
