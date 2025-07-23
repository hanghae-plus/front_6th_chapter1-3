import { useState } from "react";
import { shallowEquals } from "../equals";
import { useCallback } from "./useCallback";
// initialValue타입 명시적으로 선언
export const useShallowState = <T>(initialValue: T | (() => T)) => {
  const [state, setState] = useState<T>(initialValue);
  // setShallowState는 호출마다 새로정의 되기 때문에 메모이제이션
  const setShallowState = useCallback((nextState: T) => {
    setState((prev) => {
      return shallowEquals(prev, nextState) ? prev : nextState;
    });
  }, []);

  return [state, setShallowState] as const;
};
