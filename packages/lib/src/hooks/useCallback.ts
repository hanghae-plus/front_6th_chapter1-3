/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import type { DependencyList } from "react";
import { useMemo } from "./useMemo";
/*
함수 타입만 받을 수 있도록 제한
useCallback은 useMemo와 비슷하게 동작하지만, 함수 타입을 반환
*/
export function useCallback<T extends Function>(factory: T, _deps: DependencyList) {
  return useMemo(() => factory, _deps);
}
