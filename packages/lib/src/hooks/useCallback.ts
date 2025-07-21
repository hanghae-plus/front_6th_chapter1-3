/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import type { DependencyList } from "react";
import { useMemo } from "./useMemo";

export function useCallback<T extends Function>(factory: T, _deps: DependencyList) {
  // 직접 작성한 useMemo를 통해서 만들어보세요.

  // 디펜던시가 업데이트가 됐다.
  // 그럼 factory도 실행이 된다.

  const deps = _deps;
  const res = useMemo(() => factory, deps);

  return res;
}
