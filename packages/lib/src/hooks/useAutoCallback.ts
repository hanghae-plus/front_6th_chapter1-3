import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

// useCallback과 useRef를 이용하여 useAutoCallback
export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  // - 콜백함수가 **참조하는 값은 항상 렌더링 시점에 최신화** 되어야 한다. ← 이 부분을 어떻게 해결할 수 있을지 고민해보세요!
  // - 대신 항상 **동일한 참조를 유지**해야 한다 (useCallback 활용)

  // 최신 콜백 저장
  const fnRef = useRef(fn);
  fnRef.current = fn;

  // 항상 같은 함수 반환
  // ...args 어떤 인자든 그대로 실행
  // 어떤 인자가 올지 모르니 (...args: unknown[])로 모두 받아서 전달
  const stableCallback = useCallback((...args: unknown[]) => {
    return fnRef.current(...args);
  }, []);

  // 반환 타입을 T로 맞춰주기 위해 as T 사용
  return stableCallback as T;
};
