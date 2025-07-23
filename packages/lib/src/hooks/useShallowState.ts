import { useState } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";
import { useCallback } from "./useCallback";

export const useShallowState = <T>(initialValue: Parameters<typeof useState<T>>[0]) => {
  const prevRef = useRef<T | null>(initialValue ?? null);
  const [state, setState] = useState(initialValue);

  const setShallowState = useCallback((next: T) => {
    // 얕은 비교: 다르면 실제로 setState 호출
    if (!shallowEquals(prevRef.current, next)) {
      setState(next as never);
    }
    prevRef.current = next;
  }, []);

  return [state, setShallowState] as const;
};
