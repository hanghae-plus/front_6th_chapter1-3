import { type FunctionComponent, type ReactNode } from "react";
import { shallowEquals } from "../equals";

interface Memoed<P> {
  props: P | undefined;
  result: ReactNode | Promise<ReactNode>;
}

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  const memoed: Memoed<P> = {} as Memoed<P>;

  return function MemoizedComponent(props: P) {
    if (memoed.props !== undefined && equals(memoed.props, props)) {
      return memoed.result;
    }

    memoed.props = props;
    memoed.result = Component(props);
    return memoed.result;
  };
}
