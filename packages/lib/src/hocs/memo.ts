import { type FunctionComponent, type ReactNode } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks/useRef";

// memo HOC는 컴포넌트의 props를 얕은 비교하여 불필요한 리렌더링을 방지합니다.
export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  return function MemoizedComponent(props: P) {
    const prevPropsRef = useRef<P | null>(null);
    const renderedResultRef = useRef<ReactNode | Promise<ReactNode> | null>(null);

    // 이전 props가 존재하고, 비교 결과 동일하다면 이전 결과 반환
    if (prevPropsRef.current !== null && renderedResultRef.current !== null && equals(prevPropsRef.current, props)) {
      return renderedResultRef.current;
    }

    // 새 props일 경우: 렌더링 수행 및 결과 저장
    prevPropsRef.current = props;
    renderedResultRef.current = Component(props);

    return renderedResultRef.current;
  };
}
