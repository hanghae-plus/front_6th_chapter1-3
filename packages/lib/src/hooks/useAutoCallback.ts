import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  const lastFnRef = useRef<T | null>(null);
  //콜백함수가 참조하는 값은 항상 렌더링 시점에 최신화 되어야 한다. ← 이 부분을 어떻게 해결할 수 있을지 고민해보세요!

  lastFnRef.current = fn;

  const callback = useCallback((...arg: AnyFunction[]) => {
    return lastFnRef.current ? lastFnRef.current(...arg) : null;
  }, []);

  // console.log(fn());
  const res = callback;
  return res as T;
};
