import { useState, useCallback } from "react";
import { shallowEquals } from "../equals";

export const useShallowState = <T>(initialValue: T | (() => T)) => {
  // useState를 사용하여 상태를 관리하고,
  const [state, setState] = useState<T>(initialValue);

  // shallowEquals를 사용하여 상태 변경을 감지하는 훅을 구현합니다.
  const setShallowState = useCallback((next: T) => {
    setState((prev) => (shallowEquals(prev, next) ? prev : next));
    // 값이 얕게 같으면 상태 변경하지 않음
  }, []);

  return [state, setShallowState] as const;
};
