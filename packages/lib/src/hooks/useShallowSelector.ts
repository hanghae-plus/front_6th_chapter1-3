import { useRef } from "react";
import { shallowEquals } from "../equals";
import { useCallback } from "./useCallback";

type Selector<T, S = T> = (state: T) => S;

export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  // 이전 상태를 저장하고, shallowEquals를 사용하여 상태가 변경되었는지 확인하는 훅을 구현합니다.
  // selector 저장용 ref
  const selectorRef = useRef(selector);
  // 렌더링 시 항상 최신 selector 적용
  selectorRef.current = selector;
  // 이전 결과물 저장용 ref
  const valueRef = useRef(null);
  // 의존성 배열이 비어 있는 useCallback (한 번만 생성)
  const memoizedSelector = useCallback((state) => {
    // 최신 값 도출
    const newVal = selectorRef.current(state);
    // 최신과 이전 비교하여 같으면 이전 값 return
    if (shallowEquals(valueRef.current, newVal)) {
      return valueRef.current;
    }
    // 최신 값 설정
    valueRef.current = newVal;
    return valueRef.current;
  }, []);
  return memoizedSelector;
};
