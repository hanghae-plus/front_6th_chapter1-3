import type { FunctionComponent } from "react";
import { deepEquals } from "../equals";

export function deepMemo<P extends object>(Component: FunctionComponent<P>) {
  let prevProps: P | null = null;
  let prevResult: ReturnType<FunctionComponent<P>> | null = null;

  return function MemoizedComponent(props: P) {
    if (prevProps === null || !deepEquals(prevProps, props)) {
      prevResult = Component(props);
      prevProps = props;
    }

    return prevResult;
  };
}
