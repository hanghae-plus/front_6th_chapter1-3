import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

// useCallback과 useRef를 이용하여 useAutoCallback
export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  // 최신 콜백 저장
  const fnRef = useRef(fn);
  fnRef.current = fn;

  // 항상 같은 함수 반환(useCallback 활용)
  // 어떤 인자가 올지 모르니 (...args: unknown[])로 모두 받아서 전달
  const stableCallback = useCallback((...args: unknown[]) => {
    return fnRef.current(...args);
  }, []);

  // 반환 타입을 T로 맞춰주기 위해 as T 사용
  return stableCallback as T;
};
