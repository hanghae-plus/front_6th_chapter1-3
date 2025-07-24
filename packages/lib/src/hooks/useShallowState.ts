import { useState } from "react";
import { shallowEquals } from "../equals";
import { useCallback } from "./useCallback";

/**
 * useShallowState - shallow comparison을 통해 최적화된 state 관리 훅입니다.
 *
 * 특징:
 * - 일반 useState와 달리 shallow comparison으로 변경 감지
 * - 실제 내용이 바뀌었을 때만 리렌더링 발생
 * - 객체나 배열의 내부 값이 같으면 리렌더링하지 않음
 *
 * @param initialValue 초기 상태값
 * @returns [현재값, setter함수] 튜플
 */

export const useShallowState = <T>(initialValue: Parameters<typeof useState<T>>[0]) => {
  const [value, setValue] = useState(initialValue);

  const newSetter = useCallback((newValue: Parameters<typeof useState<T>>[0]) => {
    setValue((currentValue) => {
      if (!shallowEquals(value, newValue)) {
        return newValue;
      }
      return currentValue;
    });
  }, []);

  return [value, newSetter];
};
