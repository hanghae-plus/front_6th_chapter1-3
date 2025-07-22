import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

type Selector<T, S = T> = (state: T) => S;

export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  const prevResult = useRef<S | null>(null);

  const memoizedSelector = (state: T) => {
    const result = selector(state);

    // 이전 결과가 있고, shallow 비교에서 동일하면 이전 결과 반환
    if (prevResult.current && shallowEquals(prevResult.current, result)) {
      return prevResult.current;
    }

    prevResult.current = result;
    return result;
  };

  return memoizedSelector;
};
