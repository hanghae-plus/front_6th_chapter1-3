import { useCallback, useState } from "react";
import { shallowEquals } from "../equals";

export const useShallowState = <T>(initialValue: T): [T, (next: T) => void] => {
  const [state, setState] = useState(initialValue);

  // ✅ 항상 같은 함수를 반환해야 하므로 useCallback
  const setShallow = useCallback((next: T) => {
    setState((prev) => {
      if (shallowEquals(prev, next)) {
        return prev; // 동일하므로 상태 변경 없이 리렌더 방지
      }
      return next; // shallow하지 않으면 상태 변경
    });
  }, []);

  return [state, setShallow];
};
