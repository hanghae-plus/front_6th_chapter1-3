import { type FunctionComponent, createElement, type ReactElement } from "react";
import { shallowEquals } from "../equals";
import { useMemo, useRef } from "../hooks";

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  const MemoizedComponent = (props: P) => {
    const prevPropsRef = useRef<P | null>(null);
    const prevResultRef = useRef<ReactElement | null>(null);

    const memoizedComponent = useMemo(() => {
      const prevProps = prevPropsRef.current;

      if (prevProps && equals(prevProps, props)) {
        return prevResultRef.current;
      }

      prevPropsRef.current = props;
      const result = createElement(Component, props);
      prevResultRef.current = result;
      return result;
    }, [props]);

    return memoizedComponent;
  };

  MemoizedComponent.displayName = `memo(${Component.displayName || Component.name})`;

  return MemoizedComponent;
}
