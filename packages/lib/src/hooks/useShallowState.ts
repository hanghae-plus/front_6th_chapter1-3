import { useState, type Dispatch, type SetStateAction } from "react";
import { shallowEquals } from "../equals";
import { useAutoCallback } from "./useAutoCallback";

export const useShallowState = <T>(initialValue: T): [T, Dispatch<SetStateAction<T>>] => {
  // useState를 사용하여 상태를 관리하고, shallowEquals를 사용하여 상태 변경을 감지하는 훅을 구현합니다.
  const [value, _setValue] = useState(initialValue);
  const setValue = useAutoCallback((value: SetStateAction<T>) => {
    _setValue((prev) => {
      const next = isFunction(value) ? value(prev) : value;
      return shallowEquals(prev, next) ? prev : next;
    });
  });

  return [value, setValue];
};

function isFunction<T>(value: SetStateAction<T>): value is (prev: T) => T {
  return typeof value === "function";
}
