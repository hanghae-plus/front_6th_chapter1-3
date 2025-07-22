import type { FunctionComponent } from "react";
import { useRef } from "../hooks";
import { deepEquals } from "../equals/deepEquals";

export function deepMemo<P extends object>(Component: FunctionComponent<P>) {
  const MemoizedComponent = (props: P) => {
    const prevRef = useRef<P | null>(null);
    if (!deepEquals(prevRef.current, props)) {
      prevRef.current = props;
      return Component(props);
    }
    return null;
  };

  return MemoizedComponent;
}
