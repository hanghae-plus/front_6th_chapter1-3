import { type FunctionComponent } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks";

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals): FunctionComponent<P> {
  return (props: P) => {
    const prevPropsRef = useRef<P | null>(null);
    const prevResultRef = useRef<ReturnType<FunctionComponent<P>> | null>(null);

    if (!prevPropsRef.current || !equals(props, prevPropsRef.current)) {
      prevPropsRef.current = props;
      prevResultRef.current = Component(props);
    }

    return prevResultRef.current;
  };
}
