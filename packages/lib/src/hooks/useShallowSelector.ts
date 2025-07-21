import { useRef } from "react";
import { shallowEquals } from "../equals";

type Selector<T, S = T> = (state: T) => S;

export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  const prevSelectedStateRef = useRef<S | null>(null);

  return (state: T): S => {
    const selectedState = selector(state);

    // 이전 선택된 상태와 현재 선택된 상태를 shallowEquals로 비교
    if (prevSelectedStateRef.current === null || !shallowEquals(prevSelectedStateRef.current, selectedState)) {
      prevSelectedStateRef.current = selectedState;
    }

    return prevSelectedStateRef.current;
  };
};

// 기존의 간단한 버전 (하위 호환성을 위해 유지)
export const useShallowSelectorSimple = <T, S = T>(selector: Selector<T, S>) => {
  return (state: T): S => selector(state);
};
