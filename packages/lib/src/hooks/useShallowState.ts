/**
 * TIL: useShallowState는 참조값을 위한 훅임
 * setState로 prev와 동일한 값을 넣으면 기본적으로 리렌더가 발생하지 않음
 * 그렇다면 shallowEquals를 사용할 필요가 있는가?
 * 원시값의 경우 의미가 없지만, 참조값의 경우 prev를 그대로 넣어주어야 동일한 값으로 간주되어 리렌더를 방지할 수 있음
 */

import { useState } from "react";
import { shallowEquals } from "../equals";
import { useCallback } from "./useCallback";

export const useShallowState = <T>(initialValue: T) => {
  // useState를 사용하여 상태를 관리하고, shallowEquals를 사용하여 상태 변경을 감지하는 훅을 구현합니다.
  const [state, setState] = useState(initialValue);
  const setShallowState = useCallback(
    (newValue: T) => {
      setState((prev) => (shallowEquals(prev, newValue) ? prev : newValue));
    },
    [setState],
  );
  return [state, setShallowState];
};
