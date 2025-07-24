import { useRef } from "react";
import { shallowEquals } from "../equals";

type Selector<T, S = T> = (state: T) => S;

export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  // 이전 상태를 저장하고, shallowEquals를 사용하여 상태가 변경되었는지 확인하는 훅을 구현합니다.
  const prevRef = useRef<S | null>(null);

  return (state: T): S => {
    const currentState = selector(state);

    if (prevRef.current === null || !shallowEquals(prevRef.current, currentState)) {
      prevRef.current = currentState;
    }

    return prevRef.current!;
  };
};
