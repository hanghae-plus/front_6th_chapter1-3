export type Selector<T, S = T> = (state: T) => S;

/**
 * 스토어의 상태를 선택하는 훅
 *
 * @param selector - 스토어의 상태를 선택하는 함수 ex. (state) => state.count)
 * @returns selector 함수를 적용한 상태
 */
export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  // 이전 상태를 저장하고, shallowEquals를 사용하여 상태가 변경되었는지 확인하는 훅을 구현합니다.
  // const prevState = useRef<S | null>(null);

  return (state: T): S => selector(state);

  // return (state: T): S => {
  //   if (prevState.current === null) {
  //     prevState.current = selector(state);
  //   }

  //   if (!shallowEquals(prevState.current, selector(state))) {
  //     prevState.current = selector(state);
  //   }

  //   return prevState.current;
  // };
};
