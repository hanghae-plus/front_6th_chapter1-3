import { useRef } from "react";
import { shallowEquals } from "../equals";

type Selector<T, S = T> = (state: T) => S;

/**
 * 이전 상태를 저장하고, shallowEquals를 사용하여 상태가 변경되었는지 확인하는 훅
 * @param selector 상태를 선택하는 함수
 * @returns 선택된 상태
 * @reference https://github.com/pmndrs/zustand/blob/main/src/react/shallow.ts
 */
export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  const prev = useRef<S | null>(null);

  return (state: T) => {
    const next = selector(state);

    return shallowEquals(prev.current, next) ? (prev.current as S) : (prev.current = next);
  };
};
