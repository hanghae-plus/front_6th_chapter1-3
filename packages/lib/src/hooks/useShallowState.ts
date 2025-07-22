import { useState } from "react";
import { shallowEquals } from "../equals";
import { useCallback } from "./useCallback";

export const useShallowState = <T>(initialValue: T | (() => T)) => {
  // useState를 사용하여 상태를 관리하고, shallowEquals를 사용하여 상태 변경을 감지하는 훅을 구현합니다.
  // T: 상태값의 타입(제네릭)
  // T | (() => T): 값 또는 값을 반환하는 함수

  // useState를 사용하여 상태를 관리
  // useState<T>: 상태값의 타입을 명시
  const [state, setState] = useState<T>(initialValue);

  // setState의 참조를 고정하기 위해 useCallback 사용
  const customState = useCallback((newValue: T) => {
    // 이전 상태와 새로운 상태를 비교하여 변경이 필요한 경우에만 상태 업데이트
    setState((oldValue) => (shallowEquals(oldValue, newValue) ? oldValue : newValue));
  }, []);

  // 상태와 상태 업데이트 함수를 반환
  // [state, customState] as const: 튜플(상태, setState)
  return [state, customState] as const;
};
