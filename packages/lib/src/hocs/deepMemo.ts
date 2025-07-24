import { type FunctionComponent, memo as reactMemo } from "react";
import { deepEquals } from "../equals";

// React.memo 와 deepEquals 비교 함수를 사용한다.
export function deepMemo<P extends object>(Component: FunctionComponent<P>) {
  return reactMemo(Component, deepEquals as unknown as (prev: Readonly<P>, next: Readonly<P>) => boolean);
}
