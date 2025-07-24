import { useRef, type FunctionComponent, createElement } from "react";
import { shallowEquals } from "../equals";

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  const MemoizedComponent: FunctionComponent<P> = (props) => {
    const prevPropsRef = useRef<P | null>(null);
    const prevResultRef = useRef<ReturnType<FunctionComponent<P>> | null>(null);

    if (prevPropsRef.current && equals(prevPropsRef.current, props)) {
      return prevResultRef.current;
    }

    const result = createElement(Component, props);
    prevPropsRef.current = props;
    prevResultRef.current = result;

    return result;
  };

  return MemoizedComponent;
}
