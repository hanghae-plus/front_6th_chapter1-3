import { useState } from "react";
import { shallowEquals } from "../equals";
import { useCallback } from "./useCallback";

// number, string, array, object 얕은 비교
// 객체의 순서가 다른 경우 얕은 동등성 유지
// setState는 언제나 같은 함수 반환
export const useShallowState = <T>(initialValue: T) => {
  const [state, setState] = useState(initialValue);

  const setShallowState = useCallback((value: T) => {
    if (!shallowEquals(state, value)) setState(value);
  }, []);

  return [state, setShallowState];
};
