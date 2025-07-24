import { useRef, type FunctionComponent } from "react";
import { deepEquals } from "../equals";

export function deepMemo<P extends object>(Component: FunctionComponent<P>) {
  const MemoizedComponent = (props: P) => {
    const prevPropsRef = useRef<P | null>(null);
    const prevResultRef = useRef<ReturnType<typeof Component> | null>(null);

    if (prevPropsRef.current && deepEquals(prevPropsRef.current, props)) {
      return prevResultRef.current!;
    }

    const result = Component(props);
    prevPropsRef.current = props;
    prevResultRef.current = result;

    return result;
  };

  return MemoizedComponent;
}
