import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

// 셀렉트 값 S를 지정하지않으면 전체 state T를 반환
type Selector<T, S = T> = (state: T) => S;

export const useShallowSelector = <T, S = T>(selector: Selector<T, S>): Selector<T, S> => {
  const prevResultRef = useRef<S | undefined>(undefined);

  const shallowSelector = (state: T): S => {
    const result = selector(state);
    if (!shallowEquals(prevResultRef.current, result)) prevResultRef.current = result;
    return prevResultRef.current as S;
  };

  return shallowSelector;
};
