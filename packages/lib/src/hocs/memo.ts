import { type FunctionComponent, memo as reactMemo } from "react";
import { shallowEquals } from "../equals";

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  return reactMemo(Component, equals);
}
