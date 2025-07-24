import { type FunctionComponent, memo as reactMemo } from "react";
import { shallowEquals } from "../equals";

// React.memo 를 감싸서 기본 비교 함수를 shallowEquals 로 설정한다.
export function memo<P extends object>(
  Component: FunctionComponent<P>,
  equals: (prev: Readonly<P>, next: Readonly<P>) => boolean = shallowEquals as unknown as (
    prev: Readonly<P>,
    next: Readonly<P>,
  ) => boolean,
) {
  return reactMemo(Component, equals);
}
