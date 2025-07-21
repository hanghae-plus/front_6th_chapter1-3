import { type FunctionComponent } from "react";
import { shallowEquals } from "../equals";

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  let prevProps: P | undefined = undefined;
  let result: ReturnType<typeof Component> | undefined = undefined;

  return function MemoizedComponent(props: P) {
    if (!prevProps || !equals(prevProps, props)) {
      prevProps = props;
      result = Component(props);
      return result;
    }

    return result;
  };
}
