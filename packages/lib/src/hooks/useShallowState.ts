import { useCallback, useState } from "react";
import { shallowEquals } from "../equals";
import { isFunction } from "../equals/utils";

// useState를 사용하여 상태를 관리하고, shallowEquals를 사용하여 상태 변경을 감지하는 훅을 구현합니다.

export const useShallowState = <T>(initialValue: T | (() => T)) => {
  const [state, setState] = useState<T>(initialValue);
  const setShallowState = useCallback((value: T | ((prev: T) => T)) => {
    const nextValue = isFunction(value) ? value(state) : value;
    if (shallowEquals(state, nextValue)) {
      return;
    }

    setState(nextValue);
  }, []);

  return [state, setShallowState] as const;
};
