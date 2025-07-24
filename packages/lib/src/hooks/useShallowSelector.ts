import { useCallback, useRef } from "react";
import { shallowEquals } from "../equals";

type Selector<T, S = T> = (state: T) => S;

/**
 * shallow comparison을 사용하여 selector 함수를 메모이제이션하는 Hook입니다.
 *
 * @template T 입력 상태의 타입
 * @template S selector 결과의 타입
 * @param selector 상태에서 값을 선택하는 함수
 * @returns 메모이제이션된 selector 함수
 */
export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  const prevResult = useRef<S | undefined>(undefined);

  return useCallback(
    (state: T): S => {
      const nextResult = selector(state);

      // 첫 호출이거나 내용이 다른 경우에만 업데이트
      if (prevResult.current === undefined || !shallowEquals(prevResult.current, nextResult)) {
        prevResult.current = nextResult;
      }

      return prevResult.current;
    },
    [selector],
  );
};
