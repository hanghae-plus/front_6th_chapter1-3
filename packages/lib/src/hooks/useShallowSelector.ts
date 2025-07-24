import { useRef } from "react";
import { shallowEquals } from "../equals";

type Selector<T, S = T> = (state: T) => S;

// 이 훅은 selector 함수의 결과를 얕은 비교하여 동일한 경우 동일한 참조를 재사용한다.
// 이를 통해 useSyncExternalStore 스냅샷이 변경되어도 실제 값이 동일하다면 리렌더링을 방지할 수 있다.
export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  // prevSelected.current 에는 이전 selector 결과가 저장된다.
  const prevSelected = useRef<S | undefined>(undefined);

  return (state: T): S => {
    const nextSelected = selector(state);

    if (prevSelected.current !== undefined && shallowEquals(prevSelected.current as unknown, nextSelected as unknown)) {
      // 변경되지 않았다고 판단되면 이전 값을 반환하여 동일한 참조를 유지한다.
      return prevSelected.current as S;
    }

    // 값이 달라졌으면 참조를 갱신한다.
    prevSelected.current = nextSelected;
    return nextSelected;
  };
};
