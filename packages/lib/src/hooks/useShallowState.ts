import { useState } from "react";
import { useRef } from "./useRef";
import { shallowEquals } from "../equals";

type SetState<T> = ((n: T | ((p: T) => T)) => void) | null;

export const useShallowState = <T>(initialValue: T | (() => T)) => {
  const [value, setValue] = useState(initialValue);

  const setState = useRef<SetState<T>>(null);

  if (!setState.current) {
    // 새로운 state를 인자로 받을 수 있거나, 혹은 함수형 업데이트를 지원.
    setState.current = (newValue: T | ((prevState: T) => T)) => {
      setValue((prevState) => {
        const newState = typeof newValue === "function" ? (newValue as (prevState: T) => T)(prevState) : newValue;

        if (shallowEquals(prevState, newState)) {
          return prevState;
        }
        return newState;
      });
    };
  }

  return [value, setState.current] as const;
};
