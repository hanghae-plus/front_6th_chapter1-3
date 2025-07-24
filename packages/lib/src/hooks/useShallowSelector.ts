import { useRef } from "react";
import { shallowEquals } from "../equals";

type Selector<T, S = T> = (state: T) => S;

export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  // 이전 상태를 저장하고, shallowEquals를 사용하여 상태가 변경되었는지 확인하는 훅을 구현합니다.

  // 이전 상태를 저장하는 ref
  const prev = useRef<{ state: T; selected: S }>(null);

  // 선택된 상태를 반환하는 함수
  const selected = (state: T): S => {
    // 선택된 상태를 반환
    const selected = selector(state);
    // 이전 상태와 현재 상태가 같은지 확인
    if (prev.current && shallowEquals(prev.current.selected, selected)) {
      // 이전 상태를 반환
      return prev.current.selected;
    }
    // 이전 상태를 업데이트 후 선택된 상태를 반환
    prev.current = { state, selected };
    return selected;
  };

  return selected;
};
