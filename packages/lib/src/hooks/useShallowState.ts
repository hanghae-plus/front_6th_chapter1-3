import { useState } from "react";
import { shallowEquals } from "../equals";
import type { AnyFunction } from "../types";
import { useAutoCallback } from "./useAutoCallback";

export const useShallowState = <T>(initialValue: (() => T) | T) => {
  // useState를 사용하여 상태를 관리하고, shallowEquals를 사용하여 상태 변경을 감지하는 훅을 구현합니다.
  const [state, setState] = useState<T>(initialValue);

  const setStateWithShallowEquals = useAutoCallback((nextValue: ((prev: T) => T) | T) => {
    const newValue = isFunction(nextValue) ? nextValue(state) : nextValue;

    if (shallowEquals(state, newValue)) return;

    setState(newValue);
  });

  return [state, setStateWithShallowEquals] as const;
};

/* -------------------------------------------------------------------------------------------------
 * Helpers
 * -----------------------------------------------------------------------------------------------*/

function isFunction(value: unknown): value is AnyFunction {
  return typeof value === "function";
}
