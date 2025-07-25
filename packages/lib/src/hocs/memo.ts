import { createElement, type FunctionComponent, type ReactElement } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks";

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  return function MemoComponent(props: P) {
    const prevPropsRef = useRef<P>();
    const prevElementRef = useRef<ReactElement>();

    // 1. 첫 번째 렌더링이거나 props가 변경된 경우
    if (!prevPropsRef.current || !equals(prevPropsRef.current, props)) {
      prevPropsRef.current = props;
      prevElementRef.current = createElement(Component, props);
    }

    // 2. 이전 요소 반환
    return prevElementRef.current!;
  };
}
