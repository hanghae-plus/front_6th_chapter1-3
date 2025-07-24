import { type FunctionComponent } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks";

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  return (props: P) => {
    const lastPropsRef = useRef<P | null>(null);
    const lastRenderRef = useRef<ReturnType<FunctionComponent<P>> | null>(null);

    if (lastPropsRef.current === null || !equals(lastPropsRef.current, props)) {
      lastPropsRef.current = props;
      lastRenderRef.current = Component(props);
    }

    return lastRenderRef.current!;
  };
}
