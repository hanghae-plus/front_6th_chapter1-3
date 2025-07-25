import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  // useCallback과 useRef를 이용하여 useAutoCallback
  // useAutoCallback은 이런 방식으로 동작해야 합니다.

  // 콜백함수가 **참조하는 값은 항상 렌더링 시점에 최신화** 되어야 한다. ← 이 부분을 어떻게 해결할 수 있을지 고민해보세요!
  // 대신 항상 **동일한 참조를 유지**해야 한다 (useCallback 활용)

  const ref = useRef(fn);
  const callback = useCallback((...args: Parameters<T>): ReturnType<T> => {
    // ref.current를 통해 fn을 호출합니다.
    return ref.current(...args);
  }, []);

  // ref.current에 fn을 할당합니다.
  ref.current = fn;
  // callback을 반환합니다.
  return callback as T;
};
