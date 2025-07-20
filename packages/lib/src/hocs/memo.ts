import { createElement, useRef, type FunctionComponent, type JSX } from "react";
import { shallowEquals } from "../equals";

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals): FunctionComponent<P> {
  const MemoizedComponent: FunctionComponent<P> = (props: P) => {
    const prevPropsRef = useRef<P | null>(null);
    const prevElementRef = useRef<JSX.Element | null>(null);

    if (prevPropsRef.current === null || !equals(prevPropsRef.current, props)) {
      prevPropsRef.current = props;
      prevElementRef.current = createElement(Component, props);
    }

    return prevElementRef.current;
  };

  return MemoizedComponent;
}
