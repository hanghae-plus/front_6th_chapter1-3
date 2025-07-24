import { useRef } from "react";
import { shallowEquals } from "../equals";

type Selector<T, S = T> = (state: T) => S;

/**
 * useShallowSelector - selector 함수를 shallow comparison으로 최적화하는 훅입니다.
 *
 * 특징:
 * - 이전 결과와 shallow comparison을 통해 불필요한 리렌더링 방지
 * - 같은 값이면 이전 참조를 유지하여 === 비교에서 true 반환
 * - 값이 변경된 경우에만 새로운 참조 반환
 *
 * @param selector 상태에서 값을 선택하는 함수
 * @returns 최적화된 selector 함수
 */

export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
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
