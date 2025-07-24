import { useState } from "react";
import { shallowEquals } from "../equals";
import { useCallback } from "./useCallback";

export const useShallowState = <T>(initialValue: Parameters<typeof useState<T>>[0]) => {
  // useState를 사용하여 상태를 관리하고, shallowEquals를 사용하여 상태 변경을 감지하는 훅을 구현합니다.
  // 실제로 내용이 바뀌었을 때만 렌더링 하는 용도
  // 일반 useState 는 참조 비교로 === 쓰는데, useShallowState는 내가 구현한 shallowEquals 쓰도록

  const [value, setValue] = useState(initialValue);

  // 실제로 값이 변경되었을 때만 함수가 실행되게
  // 근데 newSetter 쓰면 매번 새로운 함수가 호출되어서 (마지막 테스트 실패)
  // useCallback으로 함수를 메모이제이션
  const newSetter = useCallback(
    (newValue: Parameters<typeof useState<T>>[0]) => {
      // 여기에서 shallowEquals 검사
      // 정말 바뀌었을 때만 setValue 호출

      setValue((currentValue) => {
        if (!shallowEquals(value, newValue)) {
          return newValue;
        }

        return currentValue;
      });
    },
    [value],
  );

  return [value, newSetter];
};
