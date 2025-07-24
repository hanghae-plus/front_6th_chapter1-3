import { useState } from "react";
import { shallowEquals } from "../equals";
import { useCallback } from "./useCallback";

export const useShallowState = <T>(initialValue: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void] => {
  // 1. useState를 사용하여 실제 상태 값과 원본 setState 함수를 관리.
  const [state, originalSetState] = useState(initialValue);

  // 2. useShallowState가 외부에 반환할 setState 함수를 useCallback으로 감싸서 참조를 고정.
  //    이 함수는 originalSetState의 함수형 업데이트를 사용하여 항상 최신 prevState를 받습니다.
  //    따라서 이 함수 자체는 외부 스코프의 'state' 변수에 의존할 필요가 없습니다.
  const customSetState = useCallback((newState: T | ((prevState: T) => T)) => {
    // 변경점 1: originalSetState를 함수형으로 호출
    originalSetState((prevState) => {
      // newState가 함수 형태일 경우, 최신 prevState를 사용하여 실제 새 값을 계산합니다.
      const actualNewValue =
        typeof newState === "function"
          ? (newState as (prevState: T) => T)(prevState) // <-- 변경점 2: prevState 사용
          : newState;

      // 최신 prevState와 계산된 actualNewValue를 shallowEquals로 비교.
      // 변경점 3: prevState 사용
      if (!shallowEquals(actualNewValue, prevState)) {
        // 두 값이 다르면, actualNewValue로 상태를 업데이트합니다.
        return actualNewValue;
      }
      // 두 값이 같으면, 이전 상태를 그대로 반환하여 상태 업데이트를 건너뛰고 리렌더링을 방지합니다.
      return prevState;
    });
  }, []); // 변경점 4: 의존성 배열을 비움

  // 현재 상태 값과 안정적인 setState 함수를 반환.
  return [state, customSetState]; // <-- 변경점 5: customSetStateRef.current 대신 customSetState 반환
};
