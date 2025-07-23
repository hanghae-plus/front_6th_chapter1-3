import { useRef, useCallback } from "./index";
import { shallowEquals } from "../equals";

type Selector<T, S = T> = (state: T) => S;

export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  // 이전 결과를 저장하는 ref
  const prevResultRef = useRef<S | undefined>(undefined);

  return useCallback(
    (state: T): S => {
      const newResult = selector(state);

      // 이전 결과가 없거나, 결과가 shallow equality 체크에서 다르면 새로운 결과 반환
      if (!prevResultRef.current || !shallowEquals(prevResultRef.current, newResult)) {
        prevResultRef.current = newResult;
        return newResult;
      }

      // 이전 결과와 같으면 이전 결과를 반환 (참조 동일성 유지)
      return prevResultRef.current;
    },
    [selector],
  );
};
