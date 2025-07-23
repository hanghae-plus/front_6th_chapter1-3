import { type FunctionComponent } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks";

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  function MemoizedComponent(props: P) {
    const propsRef = useRef(props);
    const componentRef = useRef<React.ReactNode | Promise<React.ReactNode> | null>(null);

    if (componentRef.current === null) {
      componentRef.current = Component(props);
    }

    if (!equals(propsRef.current, props)) {
      propsRef.current = props;
      componentRef.current = Component(props);
    }

    return componentRef.current;
  }

  return MemoizedComponent;
}
