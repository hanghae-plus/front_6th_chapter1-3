import { useState } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

// 1.  useCallback 사용한 버전
// export const useShallowState = <T>(initialValue: Parameters<typeof useState<T>>[0]) => {
//   const [currentState, setCurrentState] = useState<T | undefined>(initialValue);

//   const setStateToReturn = useCallback(
//     (nextState: T) => {
//       if (!shallowEquals(currentState, nextState)) {
//         setCurrentState(nextState);
//       }
//     },
//     [], // deps를 빈 배열로
//   );

//   return [currentState, setStateToReturn] as const;
// };

// 2. useRef 사용한 버전
export const useShallowState = <T>(initialValue: Parameters<typeof useState<T>>[0]) => {
  const [currentState, setCurrentState] = useState<T | undefined>(initialValue);

  // setState 함수는 항상 같은 참조를 반환
  const setStateRef = useRef((nextState: T) => {
    if (!shallowEquals(currentState, nextState)) {
      setCurrentState(nextState);
    }
  });

  return [currentState, setStateRef.current] as const;
};
