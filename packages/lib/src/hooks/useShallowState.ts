import { useState } from "react";
import { shallowEquals } from "../equals";
import { useCallback } from "./useCallback";
/**
 * useShallowState는 얕은 비교를 통해 불필요한 리렌더링을 방지하는 커스텀 훅
 * 역할
 * - 객체 상태에서 실제 값이 변경되지 않았을 때 리렌더링 방지
 * - 폼 상태 관리에서 성능 최적화
 * - 복잡한 객체의 얕은 속성만 관리할 때
 */
export const useShallowState = <T>(initialValue: T | (() => T)) => {
  const [state, setState] = useState(initialValue);

  const setShallowState = useCallback((newValue: T | ((prevState: T) => T)) => {
    setState((prevState) => {
      const nextValue = typeof newValue === "function" ? (newValue as (prevState: T) => T)(prevState) : newValue;

      if (shallowEquals(prevState, nextValue)) {
        return prevState;
      }

      return nextValue;
    });
  }, []);

  return [state, setShallowState] as const;
};
