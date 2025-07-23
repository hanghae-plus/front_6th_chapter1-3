import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

/**
 * 콜백함수가 **참조하는 값은 항상 렌더링 시점에 최신화** 되어야 한다.
 *  이 부분을 어떻게 해결할 수 있을지 고민해보세요!
 * 대신 항상 **동일한 참조를 유지**해야 한다 (useCallback 활용)
 */
// useCallback과 useRef를 이용하여 useAutoCallback

export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  const fnRef = useRef<T>(fn);
  fnRef.current = fn;

  // 의존성 배열이 빈배열이어서 항상 동일한 참조 유지
  const callback = useCallback((...args: Parameters<T>): ReturnType<T> => {
    return fnRef.current(...args); // 함수를 실행하면 됨
  }, []);

  return callback as T;
};
