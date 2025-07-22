import { useState } from "react";
import { shallowEquals } from "../equals";
import { useCallback } from "./useCallback";

/**
 * 얕은 비교(shallow equality)를 사용하여 상태를 관리하는 커스텀 훅
 *
 * @template T 상태 값의 타입
 * @param {T | (() => T)} initialValue - 초기 상태 값 또는 초기값을 반환하는 함수
 * @returns {[T, (next: T | ((prev: T) => T)) => void]} [state, setShallowState] 튜플 반환
 *
 */
export const useShallowState = <T = unknown>(initialValue: T | (() => T)) => {
  const [state, setState] = useState<T>(initialValue);

  const setShallowState = useCallback((next: T | ((prev: T) => T)) => {
    setState((prev) => {
      const nextValue = typeof next === "function" ? (next as (prev: T) => T)(prev) : next;

      if (shallowEquals(prev, nextValue)) {
        return prev;
      }
      return nextValue;
    });
  }, []);
  return [state, setShallowState] as const;
};
