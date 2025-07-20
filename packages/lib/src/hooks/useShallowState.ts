import { useState, useCallback } from "react";
import type { Dispatch, SetStateAction } from "react";
import { shallowEquals } from "../equals";

export const useShallowState = <T>(initialValue: T | (() => T)): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState(initialValue);

  // 얕은 비교를 통해 실제로 값이 변경된 경우에만 상태 업데이트
  const setShallowState = useCallback((newValue: SetStateAction<T>) => {
    setState((prevState) => {
      // 함수형 업데이트인 경우
      const nextState = typeof newValue === "function" ? (newValue as (prevState: T) => T)(prevState) : newValue;

      // 얕은 비교: 값이 같으면 상태 업데이트하지 않음 (리렌더링 방지)
      if (shallowEquals(prevState, nextState)) {
        return prevState; // 같은 참조 반환으로 리렌더링 방지
      }

      return nextState; // 실제로 변경된 경우에만 새 값 반환
    });
  }, []);

  return [state, setShallowState];
};
