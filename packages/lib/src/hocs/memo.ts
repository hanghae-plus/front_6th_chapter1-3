import { createElement, useRef, type FunctionComponent } from "react";
import { shallowEquals } from "../equals";

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  const MemoizedComponent = (props: P) => {
    const prevPropsRef = useRef<P | null>(null);
    const prevProps = prevPropsRef.current;

    if (prevProps === null || !equals(prevProps, props)) {
      prevPropsRef.current = props;
      return createElement(Component, props);
    }
    return Component;
  };

  return MemoizedComponent;
}
