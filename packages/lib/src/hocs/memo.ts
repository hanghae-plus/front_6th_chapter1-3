import { createElement, type FunctionComponent } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks/useRef";

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  return function MemoizedComponent(props: P) {
    const prevProps = useRef<P | null>(null);
    const prevComponent = useRef<React.ReactNode | null>(null);

    if (prevProps.current && equals(prevProps.current, props)) {
      return prevComponent.current!;
    }

    prevProps.current = props;
    prevComponent.current = createElement(Component, props);
    return prevComponent.current! as React.ReactElement;
  };
}
