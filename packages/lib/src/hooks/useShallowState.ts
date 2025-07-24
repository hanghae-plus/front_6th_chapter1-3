import { useState } from "react";
import { shallowEquals } from "../equals";
import { useCallback } from "./useCallback";

export const useShallowState = <T>(initialValue: T | (() => T)) => {
  // useState를 사용하여 상태를 관리하고, shallowEquals를 사용하여 상태 변경을 감지하는 훅을 구현합니다.

  // useState를 사용하여 상태를 관리
  const [state, setState] = useState<T>(initialValue);

  // setState의 참조를 고정하기 위해 useCallback 사용
  const customState = useCallback((newValue: T) => {
    // shallowEquals를 사용하여 이전 상태와 새로운 상태를 비교하여 변경이 필요한 경우에만 상태 업데이트
    setState((oldValue) => (shallowEquals(oldValue, newValue) ? oldValue : newValue));
  }, []);

  // 상태와 상태 업데이트 함수를 반환
  return [state, customState] as const;
};
