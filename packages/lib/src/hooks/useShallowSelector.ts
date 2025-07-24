import { useRef } from "react";
import { shallowEquals } from "../equals";

type Selector<T, S = T> = (state: T) => S;

export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  const memoizedState = useRef<S | null>(null);

  // 이전 상태를 저장하고, shallowEquals를 사용하여 상태가 변경되었는지 확인하는 훅을 구현합니다.
  const getMemoizedValue = (state: T): S => {
    const newSelectedState = selector(state);

    if (memoizedState.current && shallowEquals(memoizedState.current, newSelectedState)) {
      return memoizedState.current;
    }

    memoizedState.current = newSelectedState;
    return newSelectedState;
  };

  return getMemoizedValue;
};
