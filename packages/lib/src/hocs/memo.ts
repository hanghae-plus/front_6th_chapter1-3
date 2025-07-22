import { type FunctionComponent } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks";

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  const MemoizedComponent = (props: P) => {
    const prevPropsRef = useRef<P | null>(null);
    const prevComponentRef = useRef<unknown>(null);

    if (prevPropsRef.current == null || !equals(prevPropsRef.current, props)) {
      prevPropsRef.current = props;
      prevComponentRef.current = Component(props);
      return prevComponentRef.current;
    }

    return prevComponentRef.current;
  };

  return MemoizedComponent;
}
