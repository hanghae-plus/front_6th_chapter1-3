/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import type { DependencyList } from "react";
import { useMemo } from "./useMemo";

export function useCallback<T extends Function>(factory: T, _deps: DependencyList) {
  // 직접 작성한 useMemo를 통해서 만들어보세요.

  // 함수 자체를 값이라고 생각하고 useMemo를 사용해서 구현
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedCallback = useMemo(() => factory, _deps);

  return memoizedCallback as T;
}
