import { useRef } from "./useRef";
import { shallowEquals } from "../equals";

type Selector<T, S = T> = (state: T) => S;

export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  const prevValueRef = useRef<S | null>(null);

  return (state: T): S => {
    const newValue = selector(state);

    // 이전 값과 비교하여 변경되었는지 확인
    if (prevValueRef.current !== null && shallowEquals(prevValueRef.current, newValue)) {
      return prevValueRef.current;
    }

    // 값이 변경되었으면 새로운 값으로 업데이트
    prevValueRef.current = newValue;
    return newValue;
  };
};
