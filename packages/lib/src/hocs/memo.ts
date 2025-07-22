import { createElement, type FunctionComponent, type ReactNode } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks";

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  return (props: P) => {
    const prevProps = useRef<P | null>(null);
    const prevResult = useRef<ReactNode | Promise<ReactNode> | null>(null);

    if (prevProps.current === null) {
      prevProps.current = props;
      prevResult.current = createElement(Component, props);
      return prevResult.current;
    }

    if (equals(prevProps.current, props)) {
      return prevResult.current;
    }

    prevProps.current = props;
    prevResult.current = createElement(Component, props);
    return prevResult.current;
  };
}
