import type { FunctionComponent } from "react";
import { deepEquals } from "../equals";
import { memo } from "./memo";

/**
 * deepMemo - deep comparison을 사용하여 컴포넌트를 메모이제이션하는 HOC입니다.
 *
 * 특징:
 * - props의 deep comparison을 통해 리렌더링 최적화
 * - 중첩된 객체나 배열의 내부 값까지 비교
 * - React.memo보다 더 세밀한 비교로 불필요한 리렌더링 방지
 *
 * @param Component 메모이제이션할 함수형 컴포넌트
 * @returns 최적화된 메모이제이션된 컴포넌트
 */

export function deepMemo<P extends object>(Component: FunctionComponent<P>) {
  return memo(Component, deepEquals);
}
