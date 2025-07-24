import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

// useCallback과 useRef를 이용하여 useAutoCallback
export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  // useRef를 사용하여 fn을 저장합니다.
  const ref = useRef(fn);
  // fn이 변경될 때마다 ref.current를 업데이트합니다.
  ref.current = fn;

  // useCallback을 사용하여 fn을 호출하는 함수를 반환합니다.
  // 의존성 배열은 빈 배열[]로 설정하여 컴포넌트가 마운트될 때 한번만 함수를 생성합니다.
  // 이로 인해 fn이 변경되더라도 항상 최신 fn을 참조합니다.
  const callback = useCallback((...args: Parameters<T>) => {
    return ref.current(...args);
  }, []);

  return callback as T;
};
