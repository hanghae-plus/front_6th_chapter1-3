import { createElement, type FunctionComponent, type ReactElement } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks";

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  return function MemorizedComponent(props: P) {
    const propsRef = useRef<P | null>(null);
    const componentRef = useRef<ReactElement | null>(null);

    const isInitialRender = propsRef.current === null;
    const propsChanged = !equals(propsRef.current, props);

    if (isInitialRender || propsChanged) {
      propsRef.current = props;
      componentRef.current = createElement(Component, props);
    }

    return componentRef.current;
  };
}
