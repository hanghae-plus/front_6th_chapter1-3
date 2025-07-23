// factory 함수와 deps의 정확성이 보장되지만 이에 대한 lint 이슈로 인해 disable 주석 추가
/* eslint-disable react-hooks/exhaustive-deps */
import type { DependencyList } from "react";
import { useMemo } from "./useMemo";
import { deepEquals } from "../equals";

export function useDeepMemo<T>(factory: () => T, deps: DependencyList): T {
  return useMemo(factory, deps, deepEquals);
}
