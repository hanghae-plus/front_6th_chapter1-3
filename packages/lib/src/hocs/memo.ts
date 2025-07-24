import { createElement, type FunctionComponent, type ReactElement } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks/useRef";

// 핵심은 이전 렌더링 결과를 저장하고 있다가 다음 렌더링 시에 비교하여 변경된 경우에만 다시 렌더링 하는 것
export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  return function MemoizedComponent(props: P) {
    const prevPropsRef = useRef<P | null>(null);
    const prevResultRef = useRef<ReactElement | null>(null);

    const propsChanged = !prevPropsRef.current || !equals(prevPropsRef.current, props);

    if (propsChanged) {
      prevPropsRef.current = props;
      prevResultRef.current = createElement(Component, props);
    }

    return prevResultRef.current;
  };
}
