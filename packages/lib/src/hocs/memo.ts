import { type FunctionComponent, type ReactNode } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks";

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  //2. MemoizedComponent
  const MemoizedComponent = (props: P) => {
    //1. prevRef
    const prevRef = useRef<{ props: P; component: ReactNode | Promise<ReactNode> } | null>(null);
    //TODO: createElement로 써보기
    if (prevRef.current === null || !equals(prevRef.current.props, props)) {
      prevRef.current = { props, component: Component(props) as ReactNode };
    }
    return prevRef.current.component;
  };

  return MemoizedComponent;
}
