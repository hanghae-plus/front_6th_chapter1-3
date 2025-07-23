import { useRef } from "react";
import { shallowEquals } from "../equals";

type Selector<T, S = T> = (state: T) => S;

export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  // 이전 상태를 저장하고, shallowEquals를 사용하여 상태가 변경되었는지 확인하는 훅을 구현합니다.

  //이전 상태 참조
  const prevState = useRef<S | null>(null);
  return (state: T): S => {
    //선택된 상태를 가져와서 비교
    const selected = selector(state);

    //처음 실행하거나 선택된 상태가 변경되었을 때 상태 업데이트
    if (prevState.current === null || !shallowEquals(prevState.current, selected)) {
      prevState.current = selected;
    }

    //이전 상태 반환
    return prevState.current;
  };
};
