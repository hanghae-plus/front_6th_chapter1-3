import { useRef } from "react";
import { shallowEquals } from "../equals";

type Selector<T, S = T> = (state: T) => S;

// 해당 함수가 어떻게 사용되는 것 인지 잘 몰라서 JSDOC 추가를 했는데도 이해가 안가네

/**
 * 이전 상태를 저장하고, shallowEquals를 사용하여 상태가 변경되었는지 확인하는 커스텀 훅
 * 여러 값(객체, 배열 등)을 선택할 때, 불필요한 리렌더링을 막아 성능을 최적화할 수 있습니다.
 * @template T 전체 상태 타입
 * @template S 선택된 값 타입
 * @param selector 상태에서 원하는 값을 선택하는 함수
 * @returns 선택된 값 (얕은 비교로 변경 시에만 새로운 값 반환)
 * @see https://github.com/pmndrs/zustand/blob/main/src/react/shallow.ts
 */
export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  // 이전 상태를 저장하고, shallowEquals를 사용하여 상태가 변경되었는지 확인하는 훅을 구현합니다.
  const prevRef = useRef<S | null>(null);

  return (state: T): S => {
    const next = selector(state);
    return prevRef.current !== null && shallowEquals(prevRef.current, next)
      ? (prevRef.current as S)
      : (prevRef.current = next);
  };
};
