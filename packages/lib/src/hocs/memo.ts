import { type FunctionComponent, type ReactNode } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks";

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  return function MemoizedComponent(props: P) {
    const propsRef = useRef<P | null>(null);
    const memoizedComponent = useRef<ReactNode | null>(null);

    const cachedRender: FunctionComponent<P> = (props) => {
      if (!propsRef.current || !equals(propsRef.current, props)) {
        const renderedComponent = Component(props);
        propsRef.current = props;
        memoizedComponent.current = renderedComponent as ReactNode;

        return renderedComponent;
      }

      return memoizedComponent.current;
    };

    return cachedRender(props);
  };
}
