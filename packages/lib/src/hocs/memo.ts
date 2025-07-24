import { type FunctionComponent, type ReactNode } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks/useRef";

/**
 * 컴포넌트의 props를 얕은 비교하여 불필요한 리렌더링을 방지  하는 HOC입니다.
 *
 * @param Component - 메모이제이션할 함수형 컴포넌트
 * @param equals - props 비교에 사용할 함수 (기본값: shallowEquals)
 * @returns 메모이제이션된 컴포넌트
 */
export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals): FunctionComponent<P> {
  return function MemoizedComponent(props: P) {
    // 이전 props와 렌더링 결과를 저장할 ref들
    const prevPropsRef = useRef<P | null>(null);
    const memoizedResultRef = useRef<ReactNode | Promise<ReactNode> | null>(null);

    // 첫 렌더링이거나 props가 변경된 경우에만 새로 렌더링
    if (prevPropsRef.current === null || !equals(prevPropsRef.current, props)) {
      memoizedResultRef.current = Component(props);
      prevPropsRef.current = props;
    }

    // 캐시된 결과 반환
    return memoizedResultRef.current!;
  };
}
