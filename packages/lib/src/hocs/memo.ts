import { type FunctionComponent } from "react";

import { shallowEquals } from "../equals";
import { useRef } from "../hooks";

type CacheContainer<P> = {
  prevProps: P | null;
  lastResult: ReturnType<FunctionComponent<P>> | null;
};

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  const MemoizedComponent: FunctionComponent<P> = (props) => {
    const cache = useRef<CacheContainer<P>>({ lastResult: null, prevProps: null });

    const shouldRender = !equals(cache.current.prevProps, props);
    if (shouldRender) {
      cache.current.lastResult = Component(props);
      cache.current.prevProps = props;
    }

    return cache.current.lastResult;
  };

  return MemoizedComponent;
}
