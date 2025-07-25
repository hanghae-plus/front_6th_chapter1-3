import type { DependencyList } from "react";
import { useMemo } from "./useMemo"; // ✅ 직접 만든 useMemo 사용

export function useCallback<T>(factory: T, _deps: DependencyList): T {
  // ✅ useMemo를 이용해 메모이제이션된 콜백 함수 반환
  return useMemo(() => factory, _deps);
}
