import { useState, useCallback } from "react";
import { shallowEquals } from "../equals";

/**
 * 얕은 비교를 통해 불필요한 리렌더링을 방지하는 useState의 개선 버전입니다.
 *
 * 새로운 상태값이 이전 상태값과 얕은 비교(shallowEquals)에서 동일하다면
 * 리렌더링을 발생시키지 않습니다.
 *
 * @param initialValue - 초기 상태값 또는 초기값을 반환하는 함수
 * @returns [state, setState] 튜플
 *   - state: 현재 상태값
 *   - setState: 상태 업데이트 함수 (직접 값 또는 함수형 업데이트 지원)
 */
export const useShallowState = <T>(initialValue: T | (() => T)) => {
  const [state, setState] = useState(initialValue);

  const setShallowState = useCallback((newValue: T | ((prev: T) => T)) => {
    setState((prevState) => {
      let nextState: T;

      // newValue 타입에 따라 분기 처리
      if (typeof newValue === "function") {
        // 1. 함수형 업데이트: prevState를 인자로 전달하여 새로운 상태 계산
        nextState = (newValue as (prev: T) => T)(prevState);
      } else {
        // 2. 직접 값: 그대로 사용
        nextState = newValue;
      }

      // 얕은 비교로 실제 변경 여부 확인
      return shallowEquals(prevState, nextState) ? prevState : nextState;
    });
  }, []);

  return [state, setShallowState] as const;
};
