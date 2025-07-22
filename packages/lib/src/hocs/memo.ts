import { type FunctionComponent } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks";

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  //2. MemoizedComponent
  const MemoizedComponent = (props: P) => {
    //1. prevRef
    const prevRef = useRef<P | null>(null);

    if (!equals(prevRef.current, props)) {
      prevRef.current = props;
      return Component(props);
    }
    return null;
  };

  return MemoizedComponent;
}
