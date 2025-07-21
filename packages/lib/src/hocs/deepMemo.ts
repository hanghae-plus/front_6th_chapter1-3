import type { FunctionComponent } from "react";
import { memo } from "./memo";
import { deepEquals } from "../equals";

/**
 * deepMemo HOC: 전달받은 컴포넌트를 props의 "깊은 비교"를 통해 변경 여부를 판단하여
 *               props의 모든 값이 깊은 비교로 동일할 때만 이전 렌더 결과를 재사용하는 고차 컴포넌트(HOC)를 반환합니다.
 * @param Component - 메모이제이션할 함수형 컴포넌트
 * @param equals - props 비교 함수(기본값: deepEquals, 즉 깊은 비교)
 * @returns props가 깊은 비교로 동일하면 리렌더링을 방지하는 컴포넌트
 */
export function deepMemo<P extends object>(Component: FunctionComponent<P>, equals = deepEquals) {
  // memo HOC를 호출할 때, 비교 함수로 deepEquals를 사용하여
  // props의 모든 값이 깊은 비교로 같을 때만 이전 렌더 결과를 재사용합니다.
  return memo(Component, equals);
}
