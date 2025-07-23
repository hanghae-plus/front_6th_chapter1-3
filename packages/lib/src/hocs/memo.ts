import { createElement, type FunctionComponent } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks";

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  return function (props: P) {
    const prevProps = useRef<P | null>(null);
    const prevRendered = useRef<ReturnType<typeof Component> | null>(null);

    // props가 같으면 이전 결과 반환
    if (prevProps.current !== null && equals(prevProps.current, props)) {
      return prevRendered.current;
    }

    // props가 다르면 새로 렌더링 결과 저장
    prevProps.current = props;
    prevRendered.current = createElement(Component, props);

    return prevRendered.current;
  };
}
