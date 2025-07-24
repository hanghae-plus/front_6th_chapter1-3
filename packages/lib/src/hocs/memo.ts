import type { FunctionComponent, ReactNode } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks";

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  return function MemoizedComponent(props: P) {
    const prevPropsRef = useRef<P | null>(null);
    const prevComponentRef = useRef<ReactNode | Promise<ReactNode> | null>(null);

    // 첫 렌더링이면, 이전 컴포넌트를 생성하고 반환한다.
    if (!prevPropsRef.current) {
      prevPropsRef.current = props;
      prevComponentRef.current = Component({ ...props });
      return prevComponentRef.current;
    }

    // props가 변경되지 않았다면, 이전 컴포넌트를 반환한다.
    if (equals(prevPropsRef.current, props)) {
      return prevComponentRef.current;
    }

    // props가 변경되었으므로, 이전 컴포넌트를 삭제하고 새로운 컴포넌트를 생성한다.
    prevPropsRef.current = props;
    prevComponentRef.current = Component({ ...props });
    return prevComponentRef.current;
  };
}
