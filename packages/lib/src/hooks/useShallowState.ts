import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { shallowEquals } from "../equals";
import { useCallback } from "./useCallback";

// shallowEquals를 사용하여 상태 변경을 감지하는 훅을 구현합니다.
function resolveNextState<T>(prevState: T, newValue: SetStateAction<T>): T {
  // 함수형 업데이트인 경우 예외처리
  const nextState = typeof newValue === "function" ? (newValue as (prevState: T) => T)(prevState) : newValue;

  return shallowEquals(prevState, nextState) ? prevState : nextState;
}

export const useShallowState = <T>(initialValue: T | (() => T)): [T, Dispatch<SetStateAction<T>>] => {
  // useState를 사용하여 상태를 관리하고,
  const [state, setState] = useState<T>(initialValue);

  const setShallowState = useCallback<Dispatch<SetStateAction<T>>>((newValue) => {
    setState((prevState) => resolveNextState(prevState, newValue));
  }, []);

  return [state, setShallowState];
};
