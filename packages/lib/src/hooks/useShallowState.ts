import { useState } from "react";
import { shallowEquals } from "../equals";
import { useCallback } from "./useCallback";

/**얕은 비교를 통해 상태 변경을 감지하는 훅
 * useState와 동일하나 상태 변경 시 얕은 비교를 통해 변경 여부를 확인하고, 변경된 경우에만 상태를 업데이트
 * (useState는 모든 상태 변경을 감지하고 업데이트)
 */
export const useShallowState = <T>(initialValue: T) => {
  // useState를 사용하여 상태를 관리하고, shallowEquals를 사용하여 상태 변경을 감지하는 훅을 구현합니다.

  // 초기값 설정
  const [shallowState, setShallowState] = useState<T>(initialValue);

  const stableSetState = useCallback((nextValue: T) => {
    if (shallowEquals(shallowState, nextValue)) return; // 변경 안 됨
    setShallowState(nextValue); // 변경됨
  }, []);

  return [shallowState, stableSetState];
};
