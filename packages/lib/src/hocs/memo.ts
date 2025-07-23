import { type FunctionComponent } from "react";
import { shallowEquals } from "../equals";

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  let prevProps: P | null = null;
  let memoizedElement: ReturnType<typeof Component> | null = null;

  const MemoizedComponent = (props: P) => {
    if (!prevProps || !equals(prevProps, props)) {
      prevProps = props;
      memoizedElement = Component(props);
    }

    return memoizedElement;
  };

  return MemoizedComponent;
}
