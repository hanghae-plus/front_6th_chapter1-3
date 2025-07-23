import { useState } from "react";
import { shallowEquals } from "../equals";
import { useCallback } from "./useCallback";

/**
 * shallowEquals를 사용하여 상태 변경 시 참조 비교를 수행하는 커스텀 useState 훅
 *
 * @param initialValue 초기 상태 값
 * @returns 상태 값과 shallowEquals로 비교 후 변경하는 setState 함수
 */
export const useShallowState = <T>(initialValue: T) => {
  // 1. useState를 사용하여 상태를 관리
  const [state, setState] = useState<T>(initialValue);

  // 2. useCallback을 사용하여 상태 변경 함수를 관리
  const setStateWithShallowEquals = useCallback(
    (value: T) => {
      // 2-1. 상태 변경 함수가 호출되면, 초기값과 새로운 값을 비교 (참조 비교)
      if (shallowEquals(initialValue, value)) {
        return;
      }

      // 2-2. 초기값과 새로운 값이 다르면, 상태를 변경
      setState(value);
    },
    [initialValue], // 2-3. 초기값이 변경되면, 상태 변경 함수를 다시 생성
  );

  // 3. 상태와 상태 변경 함수를 반환
  return [state, setStateWithShallowEquals] as const;
};
