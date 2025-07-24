import { memo, type FunctionComponent } from "react";
import { deepEquals } from "../equals";

/**
 * 컴포넌트의 props를 깊은 비교하여 불필요한 리렌더링을 방지하는 HOC입니다.
 *
 * @param Component - 메모이제이션할 함수형 컴포넌트
 * @returns 메모이제이션된 컴포넌트
 */
export function deepMemo<P extends object>(Component: FunctionComponent<P>) {
  return memo(Component, deepEquals);
}
