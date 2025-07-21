import { useRef } from "react";
import { shallowEquals } from "../equals";

type Selector<T, S = T> = (state: T) => S;

export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  const _state = useRef<S | null>(null);

  // 이전 상태를 저장하고, shallowEquals를 사용하여 상태가 변경되었는지 확인하는 훅을 구현합니다.
  /**@todo 이름 갱장히 애매. 고쳐주세요 */
  const cachedSelector = (state: T): S => {
    const selected = selector(state);

    if (_state.current && shallowEquals(_state.current, selected)) {
      return _state.current;
    }

    _state.current = selector(state);
    return _state.current;
  };

  return cachedSelector;
};
