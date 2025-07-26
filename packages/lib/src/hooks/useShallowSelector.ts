import { useRef } from "react";
import { shallowEquals } from "../equals";

type Selector<T, S = T> = (state: T) => S;

export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  const prevStateRef = useRef<S | null>(null);

  return (state: T) => {
    const nextState = selector(state);

    // 초기 렌더링이거나 상태가 변경되었는지 확인하고 변경된 값을 갖는 함수를 반환합니다.
    if (prevStateRef.current === null || !shallowEquals(prevStateRef.current, nextState)) {
      prevStateRef.current = nextState;
      return prevStateRef.current;
    }
    return prevStateRef.current;
  };
};
