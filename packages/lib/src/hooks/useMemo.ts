import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  // deps와 value는 1:1 대응
  const memoizedState = useRef<{ value: T; deps: DependencyList } | null>(null);

  const compareFunc = _equals || shallowEquals;

  // 초기 렌더링 시 초기값 설정 or 의존성 배열이 변경되었을 때 새로운 값 계산
  if (!memoizedState.current || !compareFunc(memoizedState.current.deps, _deps)) {
    memoizedState.current = {
      value: factory(),
      deps: _deps,
    };
  }

  // 의존성 배열이 변경되지 않았을 때 이전 값 반환
  return memoizedState.current.value;
}

// ! 이게 범인. 테스트는 통과하는데 왜 제대로 동작하지 않았지?
// version 2
// const memoizedState: { value: unknown; deps: DependencyList | null } = {
//   value: null,
//   deps: null,
// };

// export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
//   const compareFunc = _equals || shallowEquals;

//   if ((!memoizedState.value && !memoizedState.deps) || !compareFunc(memoizedState.deps, _deps)) {
//     memoizedState.value = factory();
//     memoizedState.deps = _deps;
//   }

//   return memoizedState.value as T;
// }
