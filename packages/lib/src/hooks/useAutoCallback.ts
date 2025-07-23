import { useRef } from "react";
import type { AnyFunction } from "../types";

export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  const fnRef = useRef(fn);
  fnRef.current = fn; // 최신 fn을 항상 즉시 반영

  // 항상 같은 함수 참조를 반환
  const stableCallback = useRef((...args: unknown[]) => {
    // 여기서 fn(...args)를 하면 클로저가 생성
    // 최신 상태, props를 사용하는 fn을 받아도 처음 fn만 사용하게 됨
    return fnRef.current(...args);
  });

  return stableCallback.current as T;
};
