/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import type { DependencyList } from "react";
import { useMemo } from "./useMemo";
export function useCallback<T extends Function>(factory: T, _deps: DependencyList) {
  // _deps는 리터럴 값이 아니며 factory를 의존성 배열에 추가해선 안됨
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => factory, _deps);
}
