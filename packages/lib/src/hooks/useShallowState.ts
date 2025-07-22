import { useState } from "react";
import { shallowEquals } from "../equals";
import { useCallback } from "./useCallback";

export const useShallowState = <T>(initialValue: Parameters<typeof useState<T>>[0]) => {
  // useState를 사용하여 상태를 관리하고, shallowEquals를 사용하여 상태 변경을 감지하는 훅을 구현합니다.
  const [value, setValue] = useState<T>(initialValue);

  const setShallowState = useCallback((next: T) => {
    setValue((prev) => (shallowEquals(prev, next) ? prev : next));
  }, []);

  return [value, setShallowState];
};
