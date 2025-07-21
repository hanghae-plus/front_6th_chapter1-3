import { useRef, type FunctionComponent } from "react";
import { shallowEquals } from "../equals";

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  const MemoizedComponent = (props: P) => {
    const prevPropsRef = useRef<P | null>(null);
    const prevResultRef = useRef<ReturnType<typeof Component> | null>(null);

    if (prevPropsRef.current && equals(prevPropsRef.current, props)) {
      return prevResultRef.current!;
    }

    const result = Component(props);
    prevPropsRef.current = props;
    prevResultRef.current = result;

    return result;
  };

  return MemoizedComponent;
}
