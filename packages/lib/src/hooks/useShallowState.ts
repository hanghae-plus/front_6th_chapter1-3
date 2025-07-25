import { useState } from "react";
import { shallowEquals } from "../equals";
import { useCallback } from "./useCallback";

/**
 * useState를 사용하여 상태를 관리하고, shallowEquals를 사용하여 상태 변경을 감지하는 훅
 * @param initialValue 초기값
 * @returns 상태와 상태 변경 함수
 */
export const useShallowState = <T>(initialValue: Parameters<typeof useState<T>>[0]) => {
  const [state, setState] = useState<T | undefined>(initialValue);

  // 얕은 비교를 수행하는 커스텀 setState 함수
  const setShallowState = useCallback((action: T | ((prevState: T) => T)) => {
    setState((prevState) => {
      // 최초 호출 시 초기값 반환
      if (prevState === undefined) return initialValue;

      // 함수형 업데이트인지 확인
      const nextValue = typeof action === "function" ? (action as (prev: T) => T)(prevState) : action;

      // shallowEquals로 비교 후 업데이트 결정
      return shallowEquals(prevState, nextValue) ? prevState : nextValue;
    });
  }, []);

  // useState와 동일한 API 반환
  return [state, setShallowState];
};
