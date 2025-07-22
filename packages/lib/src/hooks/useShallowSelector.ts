import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

type Selector<T, S = T> = (state: T) => S;

/**
 * shallowEquals를 사용하여 상태 셀렉터의 결과를 메모이제이션하는 커스텀 훅
 *
 * @template T 전체 상태의 타입
 * @template S 셀렉터 결과 타입 (기본값: T)
 * @param {Selector<T, S>} selector - 상태에서 원하는 값을 추출하는 셀렉터 함수
 * @returns {(state: T) => S} 셀렉터 결과를 반환하는 함수. shallowEquals로 상태가 같으면 이전 결과를 재사용
 */
export function useShallowSelector<T>(selector: Selector<T, T>): (state: T) => T;
export function useShallowSelector<T, S>(selector: Selector<T, S>): (state: T) => S;
export function useShallowSelector<T, S = T>(selector: Selector<T, S>) {
  const prevStateRef = useRef<T>();
  const prevResultRef = useRef<S>();

  return (state: T): S => {
    if (prevStateRef.current !== undefined && shallowEquals(prevStateRef.current, state)) {
      return prevResultRef.current!;
    }
    const result = selector(state);

    prevStateRef.current = state;
    prevResultRef.current = result;

    return result;
  };
}
