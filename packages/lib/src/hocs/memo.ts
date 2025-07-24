import { type FunctionComponent } from "react";
import { shallowEquals } from "../equals";

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  let prevProps: P | null = null;
  let prevResult: ReturnType<FunctionComponent<P>> | null = null;

  return function MemoizedComponent(props: P) {
    if (prevProps === null || !equals(prevProps, props)) {
      prevResult = Component(props);
      prevProps = props;
    }

    return prevResult;
  };
}
