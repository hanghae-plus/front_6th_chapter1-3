import { useState, useCallback } from "react";
import type React from "react";
import { shallowEquals } from "../equals";

// React 의 useState 와 유사하지만, 새로운 값이 이전값과 얕게 동일하면 상태를 변경하지 않는다.
export const useShallowState = <T>(initialValue: T | (() => T)) => {
  const [state, setState] = useState<T>(initialValue as T);

  const setShallowState = useCallback((next: React.SetStateAction<T>) => {
    setState((prev) => {
      // next 가 함수인지 값인지 분기한다.
      const resolved: T = typeof next === "function" ? (next as (prev: T) => T)(prev) : (next as T);

      // shallowEquals 를 이용하여 동일한 경우 이전 state 반환으로 업데이트 건너뜀
      return shallowEquals(prev as unknown, resolved as unknown) ? prev : resolved;
    });
  }, []);

  return [state, setShallowState] as const;
};
