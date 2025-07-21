import { useRef, useState } from "react";
import { useCallback } from "./useCallback";
import { shallowEquals } from "../equals";

export const useShallowState = <T>(initialValue: Parameters<typeof useState<T>>[0]) => {
  const [state, _setState] = useState<T | undefined>(initialValue);
  const curState = useRef<T>(state); //setState 메모이제이션용. state를 의존해서는 안됨. -> 매번 리렌더링 됨

  curState.current = state;

  const setState = useCallback((updater: T | ((prev: T) => T)) => {
    const newValue =
      typeof updater === "function" ? (updater as (prev: T | undefined) => T)(curState.current) : updater;

    if (!shallowEquals(newValue, curState.current)) {
      _setState(newValue);
    }
  }, []);

  return [state, setState];
};
