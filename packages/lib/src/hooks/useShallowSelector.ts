import { useRef } from "react";
import { shallowEquals } from "../equals";

type Selector<T, S = T> = (state: T) => S;

export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  // 이전 상태를 저장하고, shallowEquals를 사용하여 상태가 변경되었는지 확인하는 훅을 구현합니다.
  // useRef로 이전 값 기억
  // shallowEquals로 얕은 비교로 변경 감지
  // 같으면 -> 이전 값 반환 (리랜더링 안 함)
  // 다르면 -> 새로운 값 반환 + 값을 previous에 저장

  const previousRef = useRef<S>(null);

  return (state: T): S => {
    const newValue = selector(state);

    if (previousRef.current !== null && shallowEquals(previousRef.current, newValue)) {
      return previousRef.current;
    }

    previousRef.current = newValue;
    return newValue;
  };
};
