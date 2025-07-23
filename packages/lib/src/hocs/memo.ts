import { createElement, type FunctionComponent, type ReactNode } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks";

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  const MemoizedComponent = (props: P) => {
    const prevRef = useRef<{
      props: P | null;
      element: ReactNode;
    }>({
      props: null,
      element: null,
    });

    const shouldUpdate = !equals(prevRef.current.props, props);

    if (shouldUpdate) {
      prevRef.current = {
        props,
        element: createElement(Component, props),
      };
    }

    return prevRef.current.element;
  };

  return MemoizedComponent;
}
