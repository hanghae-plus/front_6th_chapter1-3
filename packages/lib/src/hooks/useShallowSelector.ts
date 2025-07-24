import { useRef } from "react";
import { shallowEquals } from "../equals";

type Selector<T, S = T> = (state: T) => S;

export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  // 이전 상태를 저장하고, shallowEquals를 사용하여 상태가 변경되었는지 확인하는 훅을 구현합니다.
  const prevSelectedRef = useRef<S | undefined>(undefined);

  return (state: T): S => {
    const nextSelected = selector(state);

    // 첫 실행이거나 shallow 비교 결과가 다르면 새 값으로 교체
    if (prevSelectedRef.current === undefined || !shallowEquals(prevSelectedRef.current, nextSelected)) {
      prevSelectedRef.current = nextSelected;
    }
    return prevSelectedRef.current as S;
  };
};
