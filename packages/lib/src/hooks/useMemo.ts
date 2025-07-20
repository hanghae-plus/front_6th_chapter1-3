/* eslint-disable @typescript-eslint/no-unused-vars */
import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  // 직접 작성한 useRef를 통해서 만들어보세요.

  const prevDeps = useRef<DependencyList | null>(null);
  const prevResult = useRef<T | null>(null);

  if (prevDeps.current === null) {
    // 최초 실행
    prevDeps.current = _deps;
    prevResult.current = factory();
    return prevResult.current;
  }

  if (_equals(prevDeps.current, _deps)) {
    // 최초 실행에서 값을 할당하기 때문에 T 타입이라 단언한다.
    return prevResult.current as T;
  }

  prevDeps.current = _deps;
  prevResult.current = factory();
  return prevResult.current;
}
