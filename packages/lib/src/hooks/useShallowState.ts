import { useState } from "react";
import { shallowEquals } from "../equals";
import { useCallback } from "./useCallback";

export const useShallowState = <T>(initialValue: Parameters<typeof useState<T>>[0]) => {
  // useState를 사용하여 상태를 관리하고, shallowEquals를 사용하여 상태 변경을 감지하는 훅을 구현합니다.
  const [value, setValue] = useState<T>(initialValue as T | (() => T));

  const shallowSetValue = useCallback((newValue: T | ((prev: T) => T)) => {
    setValue((prevValue) => {
      // 함수형 일때 처리
      const nextValue = typeof newValue === "function" ? (newValue as (prev: T) => T)(prevValue) : newValue;

      if (shallowEquals(prevValue, nextValue)) {
        return prevValue;
      }

      return nextValue;
    });
  }, []);

  return [value, shallowSetValue] as const;
};
