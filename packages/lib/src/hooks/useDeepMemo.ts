/* eslint-disable react-hooks/exhaustive-deps */
import type { DependencyList } from "react";
import { useMemo } from "./useMemo";
import { deepEquals } from "../equals";

/**
 * deepEquals를 사용하여 의존성 배열을 비교하는 커스텀 useMemo 훅
 *
 * @param factory 결과값을 생성하는 함수
 * @param deps 의존성 배열
 * @returns 의존성(deepEquals 기준)이 변경될 때만 결과값을 갱신
 */
export function useDeepMemo<T>(factory: () => T, deps: DependencyList): T {
  // 직접 작성한 useMemo를 참고해서 만들어보세요.
  return useMemo(factory, deps, deepEquals);
}
