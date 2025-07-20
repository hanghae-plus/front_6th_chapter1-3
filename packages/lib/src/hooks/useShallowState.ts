import { useState } from "react";
import { shallowEquals } from "../equals";
import { useCallback } from "./useCallback";

type State<T extends typeof useState> = Parameters<T>[0];

export const useShallowState = <T, S = State<typeof useState<T>>>(initialValue: S): [S, (newValue: S) => void] => {
  // useState를 사용하여 상태를 관리하고, shallowEquals를 사용하여 상태 변경을 감지하는 훅을 구현합니다.
  const [value, _setValue] = useState(initialValue);

  const setValue = useCallback((newValue: S) => {
    _setValue((prev) => (!shallowEquals(value, newValue) ? newValue : prev));
  }, []);

  return [value, setValue];
};
