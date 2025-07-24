import { type FunctionComponent, createElement } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks";

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  return (props: P) => {
    const prevProps = useRef<P>();
    const prevElement = useRef<React.ReactElement>();

    if (!equals(props, prevProps.current)) {
      prevProps.current = props;
      prevElement.current = createElement(Component, props);
    }

    return prevElement.current;
  };
}
