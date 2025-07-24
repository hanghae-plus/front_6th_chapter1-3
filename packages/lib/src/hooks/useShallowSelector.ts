import { useRef } from "react";
import { shallowEquals } from "../equals";

type Selector<T, S = T> = (state: T) => S;

/**
 * 이전 상태를 저장하고, shallowEquals를 사용하여 상태가 변경되었는지 확인하는 훅
 * @reference https://github.com/pmndrs/zustand/blob/main/src/react/shallow.ts
 * @param selector 선택자 함수
 * @returns 상태가 변경되었을 때만 선택자 함수의 결과를 반환
 */
export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  const prev = useRef<S | undefined>(undefined);

  return (state: T) => {
    const next = selector(state);
    return shallowEquals(prev.current, next) ? (prev.current as S) : (prev.current = next);
  };
};
