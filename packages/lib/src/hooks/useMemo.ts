/* eslint-disable @typescript-eslint/no-unused-vars */
import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";
import { _ } from "vitest/dist/chunks/reporters.d.BFLkQcL6.js";

export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  // 직접 작성한 useRef를 통해서 만들어보세요.

  const ref = useRef<{ _deps: DependencyList; result: T } | null>(null);

  // step 0. 첫 렌더링인지 확인
  // step 1. 이전 종속성과 현재 종속성 비교
  // step 2. 종속성이 변경되지 않았다면, 이전 값만 변환 변경되면 함수 다시 실행
  // 다시 계산하고 메모 그다음 이값을 반환.

  if (ref.current === null) {
    const result = factory();
    ref.current = { _deps, result };
    return ref.current.result;
  } else {
    if (_equals(ref.current._deps, _deps)) {
      return ref.current.result;
    } else {
      const result = factory();
      ref.current = { _deps, result };
      return ref.current.result;
    }
  }
}
