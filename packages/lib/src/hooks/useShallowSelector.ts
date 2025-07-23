import { useRef } from "react";
import { shallowEquals } from "../equals";

type Selector<T, S = T> = (state: T) => S;

export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  // 이전 상태를 저장하고, shallowEquals를 사용하여 상태가 변경되었는지 확인하는 훅을 구현합니다.

  // - useSyncExternalStore에서 값을 구독할 때 selector를 활용할 수 있습니다.
  // - 기본 과제에서 작성된 shallowEquals를 활용해주세요.
  // zustand 내부를 한번 들춰보세요

  // 이전 상태를 저장하고, usememo 주섬주섬
  // const prevState = useRef<T | null>(null);
  // const prevResult = useRef<S | null>(null);

  // return (state: T): S => {
  //   // 이전 상태와 현재 상태 비교, shallowEquals를 사용
  //   // if (이전상태가 없거나 || !shallowEquals(이전상태, 현재상태))
  //   if (prevState.current === null || !shallowEquals(prevState.current, state)) {
  //     // 상태가 다르면 새로 계산
  //     prevState.current = state;
  //     prevResult.current = selector(state);
  //   }
  //   return prevResult.current!;
  // };

  // zustand 내부 참고?
  const prev = useRef<S | null>(null);
  return (state: T): S => {
    const next = selector(state);
    return shallowEquals(prev.current, next) ? (prev.current as S) : (prev.current = next);
  };
};
