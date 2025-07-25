import { createElement, type FunctionComponent } from "react";
import { shallowEquals } from "../equals";

import { useRef } from "../hooks";

// memo HOC는 컴포넌트의 props를 얕은 비교하여 불필요한 리렌더링을 방지합니다.
export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  const MemoizedComponent: FunctionComponent<P> = (props) => {
    const prevPropsRef = useRef<P | null>(null);
    const prevComponentRef = useRef<React.FunctionComponentElement<P> | null>(null);

    if (prevPropsRef.current === null || !equals(prevPropsRef.current, props)) {
      prevPropsRef.current = props;
      prevComponentRef.current = createElement(Component, props);
    }

    return prevComponentRef.current;
  };

  return MemoizedComponent;
}
