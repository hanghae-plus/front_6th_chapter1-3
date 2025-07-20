import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

// useCallback과 useRef를 이용하여 useAutoCallback
// 콜백함수가 참조하는 값은 항상 렌더링 시점에 최신화 되어야 한다. ← 이 부분을 어떻게 해결할 수 있을지 고민해보세요!
// 대신 항상 동일한 참조를 유지해야 한다 (useCallback 활용)

// "함수 참조는 항상 동일하게 유지하면서, 함수 내부에서는 항상 최신 값에 접근하자!"
// 함수 참조 고정: === 비교에서 항상 true
// 최신 값 접근: closure 문제 없이 최신 state/props 사

// 항상 같은 함수!!!!!인데, 내부에서는 최신 값을 봄!!!!
export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  // 최신 함수 저장하기
  const currentFn = useRef(fn);
  currentFn.current = fn; // 항상 최신 유지

  // useCallback으로 바뀌지 않는 래퍼 함수 생성
  const wrapper = useCallback((...args: Parameters<T>): ReturnType<T> => {
    return currentFn.current(...args); // 최신 함수 실행
  }, []) as T;

  return wrapper;
};
