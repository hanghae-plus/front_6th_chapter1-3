/* eslint-disable @typescript-eslint/no-unsafe-function-type */

/**
 * useCallback 커스텀 훅
 *
 * - 함수 타입만 인자로 받을 수 있도록 제한합니다.
 * - useMemo와 비슷하게 동작하지만, 항상 함수(콜백) 타입을 반환합니다.
 * - 의존성 배열(_deps)이 변경될 때만 새로운 함수를 반환하고, 그렇지 않으면 이전 함수를 그대로 반환합니다.
 * - 불필요한 함수 재생성을 방지해 성능을 최적화할 수 있습니다.
 */
import { useMemo } from "./useMemo";
import type { DependencyList } from "react";

export function useCallback<T extends Function>(factory: T, _deps: DependencyList) {
  return useMemo(() => factory, _deps);
}
