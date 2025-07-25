import { createElement, type FunctionComponent, type ReactElement } from "react";
import { deepEquals } from "../equals";
import { useRef } from "../hooks";

export function deepMemo<P extends object>(Component: FunctionComponent<P>) {
  return function DeepMemoComponent(props: P) {
    const prevPropsRef = useRef<P>();
    const prevElementRef = useRef<ReactElement>();

    // 첫 번째 렌더링이거나 props가 변경된 경우
    if (!prevPropsRef.current || !deepEquals(prevPropsRef.current, props)) {
      prevPropsRef.current = props;
      prevElementRef.current = createElement(Component, props);
    }

    // 이전 요소 반환
    return prevElementRef.current!;
  };
}
